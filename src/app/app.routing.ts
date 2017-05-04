import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// Guards
import { AuthenticatedGuard, NotAuthenticatedGuard } from "angular-carbonldp/guards";
import { ActiveContextResolver } from "angular-carbonldp/resolvers";

// Components
import { LoginView } from "./login/login.view";
import { WorkbenchView } from "./workbench/workbench.view";
import { ErrorView } from "./error-pages/error.view";
import { NotFoundErrorView } from "./error-pages/not-found-error/not-found-error.view";
import { DashboardView } from "./dashboard/dashboard.view";

const appRoutes:Routes = [
	{
		path: "login",
		component: LoginView,
		canActivate: [ NotAuthenticatedGuard ],
		data: {
			alias: "login",
			title: "Workbench | Log In",

			// NotAuthenticatedGuard cases
			onReject: [ "/" ],
			onError: [ "/error" ],
		}
	},
	{
		path: "",
		component: WorkbenchView,
		canActivate: [ AuthenticatedGuard ],
		data: {
			alias: "",
			displayName: "Workbench",

			// AuthenticatedGuard cases
			onReject: [ "/login" ],
			onError: [ "/error" ],
			title: "Workbench",
		},
		children: [
			{
				path: "",
				component: DashboardView,
				data: {
					alias: "",
					displayName: "Dashboard",
					title: false,
				},
			},
			{
				path: "my-apps",
				loadChildren: "./my-apps/my-apps.module#MyAppsModule",
			},
		]
	},
	{
		path: "error",
		component: ErrorView,
		data: {
			title: "Error | Workbench"
		}
	},
	{
		path: "**",
		component: NotFoundErrorView,
		data: {
			title: "404 | Workbench",
		}
	},
];


export const appRoutingProviders:any[] = [
	ActiveContextResolver,
	AuthenticatedGuard,
	NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes, { preloadingStrategy: PreloadAllModules } );