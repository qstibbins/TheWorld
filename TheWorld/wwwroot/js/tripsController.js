//tripsController.js
(function () {

    //Getting the existing module
    var app = angular.module("app-trips");

    app.controller("tripsController", ['$http', tripsController]);

    function tripsController($http) {

        var vm = this;
        vm.trips = [{
            name: "US Trip",
            created: new Date()
        }, {
            name: "World Trips",
            created: new Date()
        },
        {
            name: "Kwame World Tour",
            created: new Date()
        }];

        vm.newTrip = {};
        vm.isBusy = true;

        vm.addTrip = function (newTripForm) {

            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post('/api/trips', vm.newTrip)
                .then(function (response) {
                    //Success
                    vm.trips.push(response.data);
                    vm.newTrip = {};
                    newTripForm.$setPristine();
                    newTripForm.$setUntouched();

                }, function () {
                    //Failure
                })
                .finally(function () {
                    vm.isBusy = false;
                });

            //vm.trips.push({ name: vm.newTrip.name, created: new Date() });
        };


        $http.get("/api/trips")
            .then(function (response) {
                //Success
                angular.copy(response.data, vm.trips);
            }, function (error) {
                //Failure
                vm.errorMessage = "Failed to load data: " + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.manageTrip = function (trip)
        {
            alert(trip.name);
        };
    }
})();