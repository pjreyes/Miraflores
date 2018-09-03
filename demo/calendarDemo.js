/**
 * calendarDemoApp - 0.9.0
 */
var calendarDemoApp = angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap']);

calendarDemoApp.controller('CalendarCtrl',
   function($scope, $compile, $timeout, uiCalendarConfig, $modal) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    //$scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date + ' was clicked '  );
        $scope.openPopupCustom(date);

    };
    $scope.openPopupCustom = (date) => {
      console.log("enter to openPopupCustom")
      console.log(date._i)
        $scope.modalInstance = $modal.open({
          controller: function($scope,$modalInstance){
              $scope.customer = {};
              $scope.addEvent = function() {
                //console.log($scope.customer)
                console.log("List of scope")
                 year=date._i[0]
                 month=date._i[1]
                 day=date._i[2]
                 hour=date._i[3]
                 min=date._i[4]
                 //console.log(localDate)
                //console.log(data.toLocaleString())

                $scope.events.push({
                  title: $scope.customer.tratamiento.name,
                  start: new Date(year,month,day,hour,min),
                  end: new Date(year,month,day,hour+1,min),
                  className: ['openSesame']
                });
              };
          },
          //templateUrl: 'demo/customer.html',
            scope: $scope,
            clickOutsideToClose:true,
            templateUrl: 'modal.html',
            //controller: 'CalendarCtrl',
        });
    }
      $scope.ok = function () {
        $modalInstance.close('ok');
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.events=[];

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      console.log("use changeview")
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        selectable: true,
        select: function(date, jsEvent, view) {
            //console.log(date.format('MM/DD/YYYY'))
            $scope.alertOnEventClick(date, jsEvent, view);
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.tratements = [
      {
        name : 'Lipolaser'
      },
      {
        name : 'Depilacion Laser'
      },
      {
        name : 'Masaje'
      },
      {
        name :  'MicroBlading'
      },
      {
        name : 'Limpieza Facial Express'
      },
      {
        name : 'Limpieza Facial Profunda'
      },
      {
        name : 'Tratamiento Facial RadioFrecuencia'
      },
      {
        name : 'Tratamiento Facial MicroDermo'
      }
    ];
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});
/* EOF */
