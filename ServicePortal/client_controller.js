api.controller = function($scope) {

    var c = this;

    c.selectedHall = null;

    c.booking = {};

    c.total = 0;

    // Open booking form for selected hall
    c.selectHall = function(hall) {

        c.selectedHall = hall;

        c.booking = {};

        c.total = 0;

    };

    // Calculate booking charge
    c.calculateCharge = function() {

        if (!c.booking.start || !c.booking.end) {

            alert("Please select both start and end time.");

            return;

        }

        var start = new Date("1970-01-01T" + c.booking.start);

        var end = new Date("1970-01-01T" + c.booking.end);

        var hours = (end - start) / (1000 * 60 * 60);

        if (hours <= 0) {

            alert("End time must be greater than Start time.");

            return;

        }

        c.total = hours * parseInt(c.selectedHall.charge);

    };

    // Submit booking
    c.bookNow = function() {

        if (!c.booking.date || !c.booking.start || !c.booking.end) {

            alert("Please fill all booking details.");

            return;

        }

        if (c.total <= 0) {

            alert("Please calculate the charge first.");

            return;

        }

        c.server.update({

            action: "book",

            hall: c.selectedHall.sys_id,

            date: c.booking.date,

            start: c.booking.start,

            end: c.booking.end,

            total: c.total

        }).then(function(response) {

            if (response.data.success) {

                alert(response.data.message);

                location.reload();

            } else {

                alert(response.data.message);

            }

        });

    };

};
