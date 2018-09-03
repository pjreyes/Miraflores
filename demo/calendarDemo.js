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
    /* event source that contains custom events on the scope */
    // $scope.events = [
    //   {title: 'All Day Event',start: new Date(y, m, 1)},
    //   {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    //   {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    //   {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    // ];
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
        $scope.alertMessage = (date.title + ' was clicked ');
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
    // $scope.addEvent = function() {
    //
    //   $scope.events.push({
    //     title: 'Open Sesame',
    //     start: new Date(y, m, 28),
    //     end: new Date(y, m, 29),
    //     className: ['openSesame']
    //   });
    // };
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


    $scope.openPopup = function(Value) {
      //agregar datos del formulario
      var vm = this;
           if(Value=='Text'){
            $scope.modalInstance = $modal.open({
              controller: function($scope,$modalInstance){
                  $scope.customer = {};
                  $scope.addEvent = function() {
                    //console.log($scope.customer)
                    console.log("List of scope")
                     year=new Date($scope.customer.fecha).getFullYear()
                     month=new Date($scope.customer.fecha).getMonth()
                     day=new Date($scope.customer.fecha).getDate()
                     hour=new Date($scope.customer.fecha).getHours()
                     min=new Date($scope.customer.fecha).getMinutes()
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
              templateUrl: 'demo/customer.html',
              scope: $scope,
              clickOutsideToClose:true,
            })
          };

      }

  //   $scope.showAdvanced = function() {
  //     var vm = this;
  //     console.log("VM")
  //     console.log(vm)
  //   //var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'))  && this.customFullscreen;
  //   this.$mdDialog.show({
  //     controller: function($scope,$mdDialog){
  //         $scope.customer = {};
  //       $scope.answer = function(answer){
  //           $mdDialog.hide(answer);
  //       };
  //     },
  //     templateUrl: 'demo/customer.html',
  //     locals :{
  //       slot : slot
  //     },
  //     clickOutsideToClose:true,
  //     fullscreen: useFullScreen
  //   })
  //   .then(function(answer) {
  //       answer.date = answer.slot.date;
  //       vm.save(answer);
  //   });
  //
  // }
    // showAdvanced(slot) {
    //     var vm = this;
    //   var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'))  && this.customFullscreen;
    //   this.$mdDialog.show({
    //     controller: function($scope,$mdDialog,slot){
    //         $scope.customer = {};
    //         $scope.customer.slot = slot;
    //         $scope.tratements = [
    //     'Lipolaser',
    //     'Depilacion Laser',
    //     'Masaje',
    //     'MicroBlading',
    //     'Limpieza Facial Express',
    //     'Limpieza Facial Profunda',
    //     'Tratamiento Facial RadioFrecuencia',
    //     'Tratamiento Facial MicroDermo'
    //   ];
    //   $scope.tratements.slot = slot;
    //
    //       $scope.answer = function(answer){
    //           $mdDialog.hide(answer);
    //       };
    //     },
    //     templateUrl: 'demo/customer.html',
    //     locals : {
    //         slot : slot
    //     },
    //     clickOutsideToClose:true,
    //     fullscreen: useFullScreen
    //   })
    //   .then(function(answer) {
    //       answer.date = answer.slot.date;
    //       vm.save(answer);
    //   });
    //
    // }

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});
/* EOF */
