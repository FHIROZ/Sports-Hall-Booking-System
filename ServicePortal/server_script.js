(function () {

    data.halls = [];

    // Load Sports Halls
    var hallGR = new GlideRecord('x_2056480_sports_0_sports_hall');
    hallGR.addQuery('status', 'Available');
    hallGR.query();

    while (hallGR.next()) {

        data.halls.push({

            sys_id: hallGR.getUniqueValue(),

            name: hallGR.getValue('hall_name'),

            sport: hallGR.getValue('sport_type'),

            location: hallGR.getValue('location'),

            capacity: hallGR.getValue('capacity'),

            charge: parseInt(hallGR.getValue('hourly_charge')),

            status: hallGR.getValue('status')

        });

    }

    // Submit Booking
    if (input && input.action == "book") {

        var booking = new GlideRecord('x_2056480_sports_0_sports_booking');
        booking.initialize();

        booking.setValue('sports_hall', input.hall);
        booking.setValue('booking_date', input.date);
        booking.setValue('start_time', input.start);
        booking.setValue('end_time', input.end);
        booking.setValue('total_charge', input.total);
        booking.setValue('requested_by', gs.getUserDisplayName());
        booking.setValue('status', 'Pending');

        var id = booking.insert();

        if (id) {

            data.success = true;
            data.message = "Booking submitted successfully.";

        } else {

            data.success = false;
            data.message = "Booking failed.";

        }

    }

})();
