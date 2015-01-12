Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.map(function () { 
	this.route("home_public", {path: "/"});
	this.route("login", {path: "/login" });
	this.route("register", {path: "/register"});
	this.route("forgot_password", {path: "/forgot_password"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("home_private.issues", {path: "/home_private/issues", controller: "HomePrivateIssuesController"});
	this.route("home_private.nation", {path: "/home_private/nation", controller: "HomePrivateNationController"});
	this.route("home_private.change_password", {path: "/home_private/change_password", controller: "HomePrivateChangePassController"});
	this.route("logout", {path: "/logout"});
});

if(Meteor.isClient) {
	var publicRoutes = ["home_public", "login", "register", "forgot_password", "reset_password"];
	var privateRoutes = ["home_private", "home_private.issues", "logout"];
	var zonelessRoutes = [];

	var roleMap = [
		
	];

	this.firstGrantedRoute = function() {
		var grantedRoute = "";
		_.every(privateRoutes, function(route) {
			if(routeGranted(route)) {
				grantedRoute = route;
				return false;
			}
			return true;
		});

		if(grantedRoute == "") {
			if(routeGranted("home_private")) {
				return "home_private";				
			} else {
				return "home_public";
			}
		}

		return grantedRoute;
	}

	// this function returns true if user is in role allowed to access given route
	this.routeGranted = function(routeName) {
		if(!routeName) {
			// route without name - enable access (?)
			return true;
		}

		if(!roleMap || roleMap.length === 0) {
			// this app don't have role map - enable access
			return true;
		}

		var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
		if(!roleMapItem) {
			// page is not restricted
			return true;
		}

		if(!Meteor.user() || !Meteor.user().roles) {
			// user is not logged in
			return false;
		}

		// this page is restricted to some role(s), check if user is in one of allowedRoles
		var allowedRoles = roleMapItem.roles;
		var granted = _.intersection(allowedRoles, Meteor.user().roles);
		if(!granted || granted.length === 0) {
			return false;
		}

		return true;
	};
	
	// Meteor.subscribe("current_user_data");

	Router.ensureLogged = function() {
		if(!Meteor.user()) {
			// user is not logged in - redirect to public home
			this.redirect("home_public");
			return;
		} else {
			// user is logged in - check role
			if(!routeGranted(this.route.getName())) {
				// user is not in allowedRoles - redirect to private home
				var redirectRoute = firstGrantedRoute();
				this.redirect(redirectRoute);
				return;				
			}
			this.next();
		}
	};

	Router.ensureNotLogged = function() {
		if(Meteor.user()) {
			var redirectRoute = firstGrantedRoute();
			this.redirect(redirectRoute);
		}
		else
			this.next();
	};

	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});

	Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
	Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
}