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
          //  url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
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
        $scope.alertMessage = ((date.title) ? date.title +' Telefono : '+date.cliente.phone : null  );
        console.log("DATE")
        console.log(date)
        if(!date.title){
          $scope.openPopupCustom(date);
        }else{
          console.log("tiene datos")
        }
    };

    $scope.openPopupCustom = (date) => {
      console.log("enter to openPopupCustom")
      console.log(date._i)
      console.log("tratements")
      console.log($scope.tratamiento)

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
                 termino = "-"
                if($scope.customer.tratamiento){
                  //logica de colores para las botoneras
                  if(parseInt($scope.customer.tratamiento.duracion)<60){
                     termino= new Date(year,month,day,hour,min+parseInt($scope.customer.tratamiento.duracion))
                     console.log(termino)
                  }else{
                     termino= new Date(year,month,day,hour+1,min)
                     console.log(termino)
                  }
                }else{
                  console.log("ERROR")
                }
                $scope.events.push({
                  title: $scope.customer.name+"\t"+$scope.customer.tratamiento.name,
                  start: new Date(year,month,day,hour,min),
                  end: termino,
                  color: $scope.customer.tratamiento.color,
                  cliente:{
                            nombre : $scope.customer.name,
                            phone : ($scope.customer.phone) ? $scope.customer.phone :"Sin Telefono",
                            email : ($scope.customer.email) ? $scope.customer.email :"Sin Email",
                            tratamiento : $scope.customer.tratamiento.name,
                            duracion : $scope.customer.tratamiento.duracion
                            }
                });

                $modalInstance.close('ok');


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
        console.log("eventRender")
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
        name : 'Depilacion 60 MIN',
        duracion: 60,
        categoria: 'DEPILACIONES',
        color:'#00FF00'
      },
      {
        name : 'Depilacion 30 MIN',
        duracion: 30,
        categoria: 'DEPILACIONES',
        color:'#00FF00'
      },
      {
        name : 'Evaluacion Depilacion',
        duracion: 15,
        categoria: 'EVALUACIONES',
        color:'#FF8000'
      },
      {
        name : 'Evaluacion Corporal',
        duracion : 15,
        categoria : 'EVALUACIONES',
        color:'#FF8000'
      },
      {
        name : 'Evaluacion Facial',
        duracion : 15,
        categoria : 'EVALUACIONES',
        color:'#FF8000'
      },
      {
        name :  'Limpieza Facial Express',
        duracion : 30,
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Limpieza Facial Profunda',
        duracion : 60,
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Hidrodermo SOFT',
        duracion : 60,
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Hidrodermo FLEX',
        duracion : 60,
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Hidrodermo FLEX + SOFT',
        duracion : 60, //posiblemente 75
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Laser KLAPP',
        duracion : 60,
        categoria : 'TRATAMIENTO FACIAL',
        color:'#2E64FE'
      },
      {
        name : 'Full Reductor',
        duracion : 60,
        categoria : 'TRATAMIENTO CORPORAL',
        color:'#FA58F4'
      },
      {
        name : 'Ultra Reductor',
        duracion : 60,
        categoria : 'TRATAMIENTO CORPORAL',
        color:'#FA58F4'
      },
      {
        name : 'Plus Reductor',
        duracion : 60,
        categoria : 'TRATAMIENTO CORPORAL',
        color:'#FA58F4'
      },
      {
        name : 'Body Tono',
        duracion : 60,
        categoria : 'TRATAMIENTO CORPORAL',
        color:'#FA58F4'
      },
      {
        name : 'Fit Mantencion',
        duracion : 60,
        categoria : 'TRATAMIENTO CORPORAL',
        color:'#FA58F4'
      },
      {
        name : 'Masaje Terapeutico',
        duracion : 60,
        categoria : 'MASAJES',
        color:'#610B0B'
      },
      {
        name : 'MicroBlading',
        duracion : 60,
        categoria : 'BELLEZA',
        color:'#610B0B'
      }
    ];


    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});
/* EOF */
