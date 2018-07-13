import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { PersistedUser } from "carbonldp/Auth";

import { UsersService } from "./users.service";

@Injectable()
export class UserResolver implements Resolve<PersistedUser | boolean> {

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private usersService:UsersService;


	constructor( router:Router, route:ActivatedRoute, usersService:UsersService, private location:Location ) {
		this.router = router;
		this.activatedRoute = route;
		this.usersService = usersService;
	}


	// TODO: Change the use of location to the righ way of navigate with an activatedRoute, check if this 'bug' has been resolved on further angular versions
	resolve( route:ActivatedRouteSnapshot ):Promise<PersistedUser | boolean> | PersistedUser {
		let slug:string = route.params[ "user-slug" ];
		return this.usersService.get( slug ).then( ( user:PersistedUser ) => {
			return user;
		} ).catch( ( error:any ):boolean => {
			let url:string = this.location.path(),
				lastSlashIdx:number = url.lastIndexOf( "/" ),
				finalURL:string = url.substr( 0, lastSlashIdx ) + "/user-not-found";
			this.router.navigate( [ finalURL ] );
			return false;
		} );
	}
}