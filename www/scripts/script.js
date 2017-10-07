
// $(window).load(function(){
//     var didScroll;
//     var lastScrollTop = 0;
//     var delta = 5;
//     var navbarHeight = $('#startRec').outerHeight();
//     $(window).scroll(function(event){
//         didScroll = true;
//     });
//     setInterval(function() {
//         if (didScroll) {
//             hasScrolled();
//             didScroll = false;
//         }
//     }, 250);
//     function hasScrolled() {
//         var st = $(this).scrollTop();
        
//         if(Math.abs(lastScrollTop - st) <= delta)
//             return;
        
//         if (st > lastScrollTop && st > navbarHeight){
//             $('#startRec').removeClass('down').addClass('up');
//         } else {
//             if(st + $(window).height() < $(document).height()) {
//                 $('#startRec').removeClass('up').addClass('down');
//             }
//         }
        
//         lastScrollTop = st;
//     }
//     $('#startRec').on('click',function(){
//         //alert("--");
//     startSpeechRecongition(document.getElementById("main"));
//     setTimeout(function(){
      
//     },3000);  
//     });
// });


function setSvgCircle(per,par){
    var colors = {
        'pink': '#00acee',
        'yellow': '#f0ff08',
        'green': '#47e495'
    };

    var color = colors.pink;

    var radius = ((innerWidth - 80)/2)/3;
    var border = 3;
    var padding = 30;
    var startPercent = 0;
    var endPercent = per;


    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var boxSize = (radius + padding) * 2;


    var count = Math.abs((endPercent - startPercent) / 0.01);
    var step = endPercent < startPercent ? -0.01 : 0.01;

    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(radius)
        .outerRadius(radius - border);

    var parent = d3.select(par);

    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);

    var defs = svg.append('defs');

    var filter = defs.append('filter')
        .attr('id', 'blur');

    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '7');

    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    var meter = g.append('g')
        .attr('class', 'progress-meter');

    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('stroke-width', 4)
        .attr('d', arc.endAngle(twoPi));

    var foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 4)
        .attr('stroke-opacity', 1);

    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);

    var numberText = meter.append('text')
        .attr('fill', '#00acee')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

    function updateProgress(progress) {
        foreground.attr('d', arc.endAngle(twoPi * progress));
        front.attr('d', arc.endAngle(twoPi * progress));
        numberText.text(formatPercent(progress));
    }

    var progress = startPercent;

    (function loops() {
        updateProgress(progress);

        if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 10);
        }
    })();  
}


        jQuery(function($) {
          var $bodyEl = $('body'),
              $sidedrawerEl = $('#sidedrawer');
          function showSidedrawer() {
            var options = {
              onclose: function() {
                $sidedrawerEl
                  .removeClass('active')
                  .appendTo(document.body);
              }
            };
            var $overlayEl = $(mui.overlay('on', options));
            $sidedrawerEl.appendTo($overlayEl);
            setTimeout(function() {
              $sidedrawerEl.addClass('active');
            }, 20);
          }

          function hideSidedrawer() {
            $bodyEl.toggleClass('hide-sidedrawer');
          }
          $('.js-show-sidedrawer').on('click', showSidedrawer);
          $('.js-hide-sidedrawer').on('click', hideSidedrawer);
          var $titleEls = $('strong', $sidedrawerEl);
          $titleEls
            .next()
            .hide();
          
          $titleEls.on('click', function() {
            $(this).next().slideToggle(200);
          });

            $('#schtab').on('click',function(){
                 $('.js-hide-sidedrawer').click();
                window.location.assign('./index.html#!/schedule');
          });
        });

var mainRef;
            function getLocationPts(name,funcname,ansref,th){
                name = name.toLowerCase();
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+name+"&key=AIzaSyBKXmoWFUpatHjizC9XUxjD571Hs8CGd6c";
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function(data, status, jqXHR) {
                        //alert(JSON.stringify(data));
                        if(data.status == "ZERO_RESULTS") {
                            return 0;
                        } else {
                            //alert(JSON.stringify(data.results[0]));
                            //alert(JSON.stringify(data.results[0].geometry));
                            //alert(JSON.stringify(data.results[0].geometry.location));
                            funcname(data.results[0].geometry.location,ansref,th);
                        }
                    }
                })
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
            }

            function sayjoke(){
                var jokes = [
                "My boss is so unpopular even his own shadow refuses to follow him.",
                "If tin whistles are made of tin, what are fog horns made of?",
                "If vegetarians eat vegetables, what do humanitarians eat?",
                "If big elephants have big trunks, do small elephants have suitcases?",
                "A day without sunshine is like, night.",
                "Born free, taxed to death.",
                "Love may be blind, but marriage is a real eye-opener."
                ];
                var index = Math.trunc(Math.random()*jokes.length);
                return jokes[index];
            }
            function getAjaxObj(url){
                var ajax = new XMLHttpRequest();
                ajax.open("GET",url,true);
                ajax.send();
                return ajax;
            }
            function onDeviceReady(){
                window.plugins.speechRecognition.isRecognitionAvailable(
                      function(){
                        //alert('isRecognitionAvailable');
                        }, function(){
                        //alert('err');
                      });
            }
            function _(id) {
                return document.getElementById(id);
            }        
            var isAv = true;
            function startSpeechRecongition(ref) {
                mainRef = ref;
                if(isAv) {
                    isAv = false;
                }  else {
                    return;
                }
                ref.classList.add('active');
                setMusicVolume(0);
                var options = {
                  language:"en-US",
                  matches:5,
                  prompt:"Heyy",
                  showPopup:false,
                  showPartial:false
                }
                window.plugins.speechRecognition.startListening(function(d){
                    setMusicVolume(90);
                    ref.classList.remove('active');
                    _("mainConvo").innerHTML = "<div class='q'>"+d[0]+"</div>";
                    isAv = true;
                    //alert(d[0]);
                    commands(d[0],_("mainConvo"));
                }, function(e){
                    ref.classList.remove('active');
                    isAv = true;
                    //alert("error");
                },options);  
            }


            function innerStartSpeechRecongition(ref,func,data,msgdata) {
                ref = mainRef;
                if(isAv) {
                    isAv = false;
                }  else {
                    return;
                }
                ref.classList.add('active');
                setMusicVolume(0);
                var options = {
                  language:"en-US",
                  matches:5,
                  prompt:"Heyy",
                  showPopup:false,
                  showPartial:false
                }
                window.plugins.speechRecognition.startListening(function(d){
                    setMusicVolume(90);
                    ref.classList.remove('active');
                    //_("mainConvo").innerHTML = "<div class='q'>"+d[0]+"</div>";
                    isAv = true;
                    //alert(d[0]);
                    //commands(d[0],_("mainConvo"));
                    //alert('name'+d[0]);
                    func(1,d[0],data,null,msgdata);
                }, function(e){
                    ref.classList.remove('active');
                    isAv = true;
                    //alert("error");
                },options);  
            }

            function tts(msg,ansref){
                if(ansref != undefined)
                ansref.innerHTML += "<div class='ans'><main>"+msg+"</main></div>";
                $('#mainConvo .ans').addClass("show");

                TTS
                .speak({
                    text: msg,
                    locale: 'en-UK',
                    rate: 0.92
                }, function () {
                    //alert('success');
                }, function (reason) {
                    alert(reason);
                });
            }
            function setMusicVolume(v){
                //window.androidVolume.setMusic(v, false,function(){},function(){});
            }
            function recognizeSpeech() {
                setMusicVolume(0);
                //VolumeControl.toggleMute();
                var options = {
                  language:"en-US",
                  matches:5,
                  prompt:"Heyy",
                  showPopup:false,
                  showPartial:false
                }
                document.getElementById("loading").innerHTML="Listening";
                window.plugins.speechRecognition.startListening(
                  function(d){
                    setMusicVolume(90);
                    document.getElementById("loading").innerHTML="";
                    //alert(typeof d);
                    commands(d[0])}, function(e){},options);
                // var maxMatches = 5;
                // var promptString = "Speak now"; // optional
                // var promptd = false;
                // var language = "en-US";                     // optional
                // window.plugins.speechrecognizer.startRecognize(function(result){
                //     alert(result);
                // }, function(errorMessage){
                //     alert("Error message: " + errorMessage);
                // }, options);
                //VolumeControl.toggleMute();
            }

            function getSupportedLanguages() {
                window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
                    alert(languages);
                }, function(error){
                    alert("Could not retrieve the supported languages : " + error);
                });
            }
            function bytesToSize(bytes) {
               var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
               if (bytes == 0) return '0 Byte';
               var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
               return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }

            function ramUsage(ansref) {
                var status = "";
                chrome.system.memory.getInfo(function(data){
                    var ramper = Math.trunc((data.availableCapacity*100)/data.capacity);
                    if(ramper < 25){
                        status = "critical";
                    } else if(ramper > 25 && ramper < 50) {
                        status = "fine";
                    } else {
                        status = "excellent";
                    }                    
                    ansref.innerHTML += '<div class="ans ram"><div class="list"><div class="item-divider">Basic Information</div><div class="item"><div>Total RAM</div><div>'+bytesToSize(data.capacity)+'</div></div><div class="item"><div>Available RAM</div><div>'+bytesToSize(data.availableCapacity)+'</div></div><div class="item"><div>Running RAM</div><div>'+bytesToSize(data.capacity-data.availableCapacity)+'</div></div><div class="item-divider">RAM Statistics</div><div class="item"><div id="raminfocircle"><div id="avram"></div><div id="usram"></div></div></div></div></div>';
                    tts("device memory status is "+status);
                    $('#mainConvo .ans').addClass("show");
                    setTimeout(function(){
                        setSvgCircle(ramper/100,"div#avram");
                        setSvgCircle((100-ramper)/100,"div#usram");
                    },200);
                });
            }

            function checkSpeechRecognition() {
                window.plugins.speechrecognizer.checkSpeechRecognition(function(){
                    alert('Speech Recogition is present! :D');
                }, function(){
                    alert('Speech Recogition not found! :(');
                });
            }
                  function createMarker(place) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                      map: map,
                      position: place.geometry.location
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                      infowindow.setContent(place.name);
                      infowindow.open(map, this);
                    });                
                    }
            function mapThingsNear(data,ansref,thng){
                alert(thng);
                var pyrmont = {lat: data.lat, lng: data.lng};
                ansref.innerHTML += '<div class="ans map" style="border:1px solid red"></div>';
                var map = new google.maps.Map(document.getElementById('placemap'), {
                  center: pyrmont,
                  zoom: 15
                });
                var thar = [];
                thar.push(thng);
                var infoWindow = new google.maps.InfoWindow({ map: map });
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                  location: pyrmont,
                  radius: 5500,
                  type: thar
                },
                  function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                      var htmlcode="";

                      for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    htmlcode+='<div class="item">';
                    htmlcode+='<div class="name">'+results[i].name+'</div>';
                    htmlcode+='<div class="vicinity">'+results[i].vicinity+'</div>';
                    htmlcode+='<div class="ratings">'+results[i].rating+'</div>';
                    htmlcode+='</div>';
                        createMarker(results[i]);
                      }
                      htmlcode +='<div class="list">'+htmlcode+'</div>';
                      ansref.getElementsByClassName('ans')[0].innerHTML += htmlcode;
                    }
                  });

            }


            function getContacts(id,name,data,ansref,msgdata){
                function onSuccessCopntacts(contacts) {
                    //alert('Found ' + JSON.stringify(contacts) + ' contacts. = '+contacts.length);
                    var dhtml = "";
                    if(contacts.length == 0 ){
                        tts("No such person found.Please try different name",null);
                    } else if(contacts.length == 1) {
                        sendWhatsapp(msgdata,contacts[0].phoneNumbers[0].value);
                    } else {
                    for(var i=0;i<contacts.length;i++){
                        //alert(contacts[i].id+"-"+contacts[i].displayName);     
                        dhtml+="<p style='padding-bottom:2px;border-bottom:1px solid #999'>";
                        dhtml+="<div>"+contacts[i].displayName+"</div>";
                        // if(contacts[i].displayName.toLowerCase() == name.toLowerCase()){
                            
                        //     break;
                        // }
                        dhtml+="&nbsp;&nbsp;&nbsp; -<div>"+contacts[i].phoneNumbers[0].value+"</div>";
                        dhtml+="<p>";
                    }
                    ansref.innerHTML += "<div class='ans'><main>"+dhtml+"</main></div>";
                    tts("Which "+name,null);
                    setTimeout(function(){
                        innerStartSpeechRecongition(null,getContacts,contacts,msgdata); 
                    },3217);
                    }
                };

                function onErrorC(contactError) {
                    alert('onError!');
                };
                function sendWhatsapp(msg,no){
                    //alert(msg+"--"+no);
                    //alert("https://api.whatsapp.com/send?phone="+no+"&text="+msg);
                    window.location.assign("https://api.whatsapp.com/send?phone="+no+"&text="+msg);
                };
                //alert(id);
                if(id==0){
                    //alert("Contacts -==- "+name);
                    var options      = new ContactFindOptions();
                    options.filter   = ""+name;
                    options.multiple = true;
                    options.desiredFields = [navigator.contacts.fieldType.id,navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];
                    options.hasPhoneNumber = true;
                    var fields       = [navigator.contacts.fieldType.displayName];
                    navigator.contacts.find(fields, onSuccessCopntacts, onErrorC,options);  
                } else if(id==1){
                    for(var i=0;i<data.length;i++){
                        if(data[i].displayName == name){
                            sendWhatsapp(msgdata,data[i].phoneNumbers[0].value);
                            break;
                        }
                    }
                    if(i==data.length){
                        alert("Sorry i cant find");
                    }
                }
            }


            function torch(status){
                //alert("torch");
                window.plugins.flashlight.available(function(isAvailable) {
                    if (isAvailable) {
                        if(status=="on")
                            window.plugins.flashlight.switchOn();
                        else 
                            window.plugins.flashlight.switchOff();
                    } else {
                        alert("Flashlight not available on this device");
                    }
                });               
            }      
            function setBrighness(c,ansref) {
                var d = 0.5;
                if(c == "i") {
                    d = 0.9;
                } else {
                    d = 0.2;
                }
                var brightness = cordova.plugins.brightness;
                alert(brightness);
                if(brightness != undefined) {

                    brightness.setBrightness(d, function(){
                        if(d>0.5)
                            tts("Brightness set to high",ansref);
                        else 
                            tts("Brightness set to low",ansref);
                    }, function(){

                    });
                }
            }  
            function playMusic(){
                MusicControls.create({
                    
                    isPlaying   : true,                         // optional, default : true 
                    dismissable : true,                         // optional, default : 
                    hasPrev   : false,      // show previous button, optional, default:
                    hasNext   : false,      // show next button, optional, default: true 
                    hasClose  : true,       // show close button, optional, default: false 
                    // iOS only, optional 
                    album       : 'Marathi Ganesh Songs',     // optional, default: '' 
                    duration : 60, // optional, default: 0 
                    elapsed : 10, // optional, default: 0 
                    ticker    : 'Now playing "Time is Running Out"'
                }, onSuccess, onError);                
            }        
            function wikiSearch(q,ansref) {
                var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ q +"&format=json&callback=?"; 
                //alert(url);
                q = q.toLowerCase();
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function(data, status, jqXHR) {
                        var index = -1;
                        console.log(data);
                        for(var i=0;i<data[1].length;i++){
                            var r = data[1][i].toLowerCase();
                            if(r == q) {
                                var z0 = r+" may refer to:";
                                z0 = z0.toLowerCase();
                                var z1 = data[2][i].toLowerCase();
                                if(z1.length < 10) continue;
                                console.log(z0 + " -- " +z1); 
                                if(z0 == z1) {
                                    index = i+1;
                                } else {
                                    index = i;
                                }
                                break;
                            }
                        }
                        if(index > -1) {
                            //ansref.innerHTML += '<div class="ans"><main>Here is what i found about '+data[1][i]+'</main><div class="box wikiinfo"><div class="title">'+data[1][index]+'</div><div class="infodata">'+data[2][index]+'</div></div></div>';
                            ansref.innerHTML +='<div class="ans wikiSearch"><div class="heading">'+data[1][index]+'</div><div class="infodata">'+data[2][index]+'</div></div>';
                                tts(data[2][index],undefined);
                                $('#mainConvo .ans').addClass("show");
                        } else {

                        }
                    }
                })
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
            }
            function getWeatherAcc(loc,ansref) {
                var url = "http://api.openweathermap.org/data/2.5/weather?lat="+loc.lat+"&lon="+loc.lng+"&APPID=0442e553754e22dd2e70deb96cfcf1ae";  
                console.log(url);
                //alert(url);
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function(data, status, jqXHR) {
                        //alert(JSON.stringify(data));
                        //alert(JSON.stringify(data.main));
                        //alert(JSON.stringify(data.weather[0]));
                        var ks = Object.keys(data.main);
                        //alert("ansref = "+ansref+" -- " + ks.length);
                        //alert(data.weather[0].description);
                        //alert(Math.round((data.main.temp-273)));
                        var htmlcode = "";
                        if(ks.length > 0) {
                            htmlcode += '<div class="ans weather show">';
                            htmlcode += '<div class="title">Weather</div>';
                            htmlcode += '<div class="logo_temp">';
                            htmlcode += '<div class="logo" style="background:orangered;color:#fff;">'+data.weather[0].description+'</div>';
                            htmlcode+= '<div class="temp">'+Math.round((data.main.temp-273))+'<sup>o</sup></div></div>';
                            htmlcode+= '<div class="list"><div class="item-divider">Other Information</div>';
                            //alert("1 - "+htmlcode);
                            for(var i=0;i<ks.length;i++){
                                //alert("1.5 - "+ks[i]+" - "+data.main[ks[i]]);
                                htmlcode += '<div class="item">';
                                htmlcode += '<div>'+ks[i]+'</div>';
                                htmlcode += '<div>'+data.main[ks[i]]+'</div>';
                                htmlcode += '</div>';
                            }
                            htmlcode+='</div></div>';
                            //alert("2 - "+htmlcode);
                            ansref.innerHTML += htmlcode;
                        } else {
                            //alert("error");
                        }
                    }
                })
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
                
            };
            function getWeather(name,ansref){
                if(name == undefined || name.length < 2) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        /*
                        alert('Latitude: '          + position.coords.latitude          + '\n' +
                          'Longitude: '         + position.coords.longitude         + '\n' +
                          'Altitude: '          + position.coords.altitude          + '\n' +
                          'Accuracy: '          + position.coords.accuracy          + '\n' +
                          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                          'Heading: '           + position.coords.heading           + '\n' +
                          'Speed: '             + position.coords.speed             + '\n' +
                          'Timestamp: '         + position.timestamp                + '\n');
                        getWeatherAcc({
                            "lat":position.coords.latitude,
                            "lng":position.coords.longitude
                        },ansref);
                        */
                    }, 
                    function(error) {
                        //alert('code: '    + error.code    + '\n' +
                         //     'message: ' + error.message + '\n');
                        getWeatherAcc({
                            "lat":"19.22",
                            "lng":"77.33"
                        },ansref);
                    });
                } else {
                    //alert('im here 1');
                    var loc = getLocationPts(name,getWeatherAcc,ansref);
                    // alert(JSON.stringify(loc));
                    // if(loc == 0) {

                    // } else {
                    //     var url = "http://api.openweathermap.org/data/2.5/weather?lat="+loc.lat+"&lon="+loc.lng+"&APPID=0442e553754e22dd2e70deb96cfcf1ae";
                    //     getWeatherAcc(url);
                    // }
                }
            }
            function searchOnYoutube(q,ansref) {
                var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q="+q+"&type=video&key=AIzaSyDWzU-eBvt2z4QUt-iP2rzMNGrL3EqQvjg";
                    $.ajax({
                        url: url,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        dataType: "json",
                        success: function(data, status, jqXHR) {
                            var index = -1;
                            console.log(data);
                            var htmlcode = "";
                            if(data.pageInfo.totalResults > 0) {
                                //htmlcode += '<div class="ans youtube"><main>Here is what i got related to '+q+'</main><br><div class="swiper-container"><div class="swiper-wrapper">';
                                    htmlcode += '<div class="ans youtube"><main style="padding:8px;">Here is what i got related to '+q+'</main><br>';
                                for(var i=0;i<data.items.length;i++) {
                                    var vidid = data.items[i].id.videoId;
                                    var title = data.items[i].snippet.title;
                                    htmlcode += '<div style="border-top:1px solid #ddd;height:20px;"></div><iframe src="https://www.youtube.com/embed/'+vidid+'?autoplay=0"></iframe><div class="infodata"><div class="heading">'+title+'</div></div>';
                                    //htmlcode += "</div></div></div>";
                                }
                                    htmlcode += "</div>";
                            } else {
                                htmlcode = '<div class="ans">Sorry</div>';
                            }
                            console.log(htmlcode);
                            ansref.innerHTML += htmlcode;
                            $('#mainConvo .ans').addClass("show");
                        }
                    })
                    .done(function() {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });                
            }
            function getVideoOfChannel(name,ansref){
                var url = "https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics%2CcontentDetails%2CtopicDetails&forUsername="+name+"&key=AIzaSyDWzU-eBvt2z4QUt-iP2rzMNGrL3EqQvjg";
                    $.ajax({
                        url: url,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        dataType: "json",
                        success: function(data, status, jqXHR) {
                            console.log(data);
                            if(data.pageInfo.totalResults > 0) {
                                channelId = data.items[0].id;
                                var inurl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDWzU-eBvt2z4QUt-iP2rzMNGrL3EqQvjg&channelId="+channelId+"&part=snippet,id&order=date&maxResults=1";
                                $.ajax({
                                    url: inurl,
                                    type: 'GET',
                                    contentType: "application/json; charset=utf-8",
                                    async: false,
                                    dataType: "json",
                                    success: function(data, status, jqXHR) {
                                        console.log(data);
                                        var htmlcode = "";
                                        if(data.pageInfo.totalResults > 0) {
                                    var vidid = data.items[0].id.videoId;
                                    var title = data.items[0].snippet.title;                                            
                                            htmlcode += '<div class="ans youtube"><main style="padding:8px;">Here is what i got related to '+name+'</main>';
                                            htmlcode += '<iframe src="https://www.youtube.com/embed/'+vidid+'?autoplay=0"></iframe><div class="infodata"><div class="heading">'+title+'</div></div>';
                                            htmlcode += "</div>";
                                        } else {
                                            htmlcode+="<div class='ans'><main>Sorry</main></div>";
                                        }
                                        console.log(htmlcode);
                                        ansref.innerHTML += htmlcode;
                                        $('#mainConvo .ans').addClass("show");
                                    }
                                })
                                .done(function() {
                                    console.log("success");
                                })
                                .fail(function() {
                                    console.log("error");
                                })
                                .always(function() {
                                    console.log("complete");
                                });                                                                   
                            } else {
                            }
                        }
                    })
                    .done(function() {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });                
            }


            function listSMS(ansref) {
            //updateData('');
            
            if(SMS) SMS.listSMS({}, function(data){
                //alert('sms listed as json array');
                //updateData( JSON.stringify(data) );
                //alert(JSON.stringify(data));
                var html = "";
                var prepareSMS = "";
                if(Array.isArray(data)) {
                    for(var i in data) {
                        //alert(data[i]);
                        var sms = data[i];
                        //smsList.push(sms);
                        html += "<div class='ans msg'><h4>"+sms.address + "</h4><hr>" + sms.body + "</div>";
                        prepareSMS += sms.address + "wants to message you that " + sms.body;
                        break;
                    }
                }
                ansref.innerHTML += html;
                tts(prepareSMS);
                //updateData( html );
                
            }, function(err){
                alert('error list sms: ' + err);
            });
        }

            function readSchedule(){
                if(window.localStorage.schedule3 == undefined) {
                    tts("no schedule set for today");
                } else {
                    var scd = JSON.parse(window.localStorage.schedule3);
                    console.log(scd);
                    if(scd.lists.length < 1) {
                        tts("no schedule set for today");
                    } else {
                        var readstr = "";
                        for(var i=0;i<scd.lists.length;i++){
                            readstr += scd.lists[i].msg+" at "+scd.lists[i].time + "   .  ";
                        }
                        console.log(readstr);
                        tts(readstr);
                    }
                }
            }
            function commands(msg,convoid){
                var ansref = convoid;
                msg = msg.toLowerCase();
                msg.trim();
                //alert(msg);
                var calcRegex = /[0-9]+[\s]?[+|\-|*|/][\s]?[0-9]+/;
                var rx = /((add)|(addition of)|(subtract)|(multiply)|(multiplication of)|(divide))[\s]?([0-9]+)[\s]?[\w]+[\s]+([0-9]+)/;
                var wikirx = /((who is)|(can you tell me about)|(can you please tell me about)|(give information about)|(give information of)|(are you able to tell me about)|(tell me something about))[\s]?([a-zA-z0-9\s]+)/;
                var recYtChrx = /((show video of)|(show videos of)|(i want to see the recently uploaded video of)|(i want to see the recently uploaded videos of)|(show me recent uplaods of)|(show me recent uplaoded video of)|(recent uploads of)|(recent upload of)|(show me latest video of)|(open latest video of)|(open last video of))[\s]?([a-zA-z0-9\s]+)/;
                var weatherrx = /((what's temperature in)|(what is todays temperature in)|(what is the temperature in)|(what is the weather in)|(give weather information of)|(give weather info of))[\s]?([a-zA-z0-9\s]+)?/;
                var maprx = /((search)|(find the)|(search the)|(list)|(list the)|(give list of)|(name of)|(suggest))[\s]?([a-zA-z0-9]+)[\s]((in)|(in the)|(nearby))[\s]([a-zA-Z0-9\s]+)/;
                var whatapprx = /((whatsapp)|(what's up)|(what's app)|(whats app)|(whats up)|(message))\s([a-zA-Z]+)\s(to)?(\s)?([a-zA-Z0-9\s]+)/;
                var ytsrx = /(youtube)\s([A-Za-z0-9\s]+)/;   
                var ggsrx = /(google)\s([A-Za-z0-9\s]+)/;             
                if(calcRegex.test(msg)){
                    tts("answer is "+eval(msg),ansref);
                } else if(rx.test(msg)){
                    var newmsg="";
                    var outs = /((add)|(addition of)|(subtract)|(multiply)|(multiplication of)|(divide))[\s]?([0-9]+)[\s]?[\w]+[\s]+([0-9]+)/.exec(msg);
                    if(outs[1]=="add" || outs[1]=="addition of") {
                        newmsg = outs[8] + " + " + outs[9];
                    } else if(outs[1]=="subtract"){
                        newmsg = outs[8] + " - " + outs[9];
                    } else if(outs[1]=="multiply" || outs[1]=="multiplication of"){
                        newmsg = outs[8] + " * " + outs[9];
                    } else if(outs[1]=="divide"){
                        newmsg = outs[8] + " / " + outs[9];
                    } else {
                        tts("Sorry! I did not  recognize, please say again");
                    }
                    //alert("newmsg = "+newmsg);
                    if(calcRegex.test(newmsg)) {
                        tts("answer is "+eval(newmsg),ansref);
                    } else {
                        tts("Sorry! I did not  recognize, please say again");
                    }

                } else if(maprx.test(msg)){
                    var mprx = maprx.exec(msg);
                    if(mprx[10] != undefined && mprx[10].length  > 2){
                      if(mprx[15] != undefined && mprx[15].length > 2) {
                        getLocationPts(mprx[15],mapThingsNear,ansref,mprx[10]);
                      }
                    }

                } else if(wikirx.test(msg)){
                    msg = msg.replace("today","");
                    msg = msg.replace("2day","");
                    var q = wikirx.exec(msg)[9];
                    if(q.length > 2) {
                        wikiSearch(q,ansref);
                    } else {
                        //alert("I did'nt catch");
                    }
                } else if(weatherrx.test(msg)){
                    var rs = weatherrx.exec(msg);
                    var cityn = rs[8];
                    if(cityn.indexOf('yesterday') > -1) {
                        alert("i cant");
                    } else if(cityn.indexOf('tomorrow') > -1) {
                        alert("i cant");
                    } else {
                        getWeather(cityn,ansref);
                    }
                }else if(ytsrx.test(msg)){
                    var mg = ytsrx.exec(msg);
                    searchOnYoutube(mg[2],ansref);
                }else if (msg.indexOf('how to') >= 0) { 
                    searchOnYoutube(msg,ansref);
                } else if(recYtChrx.test(msg)){
                    var chn = recYtChrx.exec(msg)[13]
                    if(chn.length > 2)
                       // getVideoOfChannel(chn,ansref);
                   searchOnYoutube(chn,ansref);
                } else if(msg.indexOf("last sms") >= 0 || msg.indexOf("last message") >= 0){
                    listSMS(ansref);
                } else if(whatapprx.test(msg)){
                    var mg = whatapprx.exec(msg);
                    getContacts(0,mg[8],null,ansref,mg[11]);
                }else if(ggsrx.test(msg)){
                    var mg = ggsrx.exec(msg);
                    //ansref.innerHTML = '<iframe src="https://www.google.com/search?q='+mg[2]+'" />';
                    window.location.assign("https://google.com/search?q="+mg[2]);
                } else { 
                    switch(msg){
                        case "hello":
                        case "hey":
                            tts("hello sir",ansref);
                            //getContacts("Alok");
                            //getContacts("Ashish");
                            //getWeather("mumbai");
                            //listSMS(ansref);
                            break;
                        case "how are you":
                        case "how are you?":
                            tts("I'm fine, what about you",ansref);
                            break;
                        case "increase brightness":
                        case "set brightness to high":
                        case "set the brightness to high":
                            setBrightness("i",ansref);
                            break;
                        case "decrease brightness":
                        case "set brightness to low":
                        case "set the brightness to low":
                            setBrightness("d",ansref);
                            break;
                        case "show ram usage":
                        case "show ram information":
                        case "show ram info":
                        case "show memory usage":
                        case "show memory information":
                        case "show memory info":
                        case "show random access memory usage":
                        case "show random access memory information":
                        case "show random access memory info":
                        case "show me ram usage":
                        case "show me ram information":
                        case "show me ram info":
                        case "show me memory usage":
                        case "show me memory information":
                        case "show me memory info":
                        case "show me random access memory usage":
                        case "show me random access memory information":
                        case "show me random access memory info":                        
                            ramUsage(ansref);
                            break;
                        case "turn on torch":
                        case "turn on torch":
                        case "turn on flashlight":
                        case "turn on torchlight":
                        case "turn on torch light":
                        case "turn on light":
                        case "turn torch on":
                        case "turn flashlight on":
                        case "turn torchlight on":
                        case "turn torch light on":
                        case "turn light on":
                            torch("on");
                            break;
                        case "turn off torch":
                        case "turn off flashlight":
                        case "turn off torchlight":
                        case "turn off torch light":
                        case "turn off light":
                        case "turn torch off":
                        case "turn flashlight off":
                        case "turn torchlight off":
                        case "turn torch light off":
                        case "turn light off":
                            torch("off");
                            break;
                        case "tell me an joke":
                        case "tell me a joke":
                        case "tell me joke":
                        case "say joke":
                            //alert("joke = "+send_jokes());
                            tts(sayjoke(),ansref);
                            break;      
                        case "read my schedule":
                        case "read schedule":
                        case "show schedule":
                        case "show me schedule":
                            readSchedule();   
                            break;  
                        case "what can you do for me":
                        case "what can you do":
                        case "what can i say":
                            var notsa = [
                                "Google anything",
                                "Whatsapp Sanket",
                                "Read my schedule",
                                "Read Last Message",
                                "Youtube Search",
                                "Whatsapp Aniket",
                                "32 + 17",
                                "what is the temperature in mumbai",
                                "wikipedia anything. Eg. who is steve jobs",
                                "Turn on torch",
                                "Show memory usage",
                                "Tell me a joke"
                            ];
                            var dhtml = "";
                            for(var i=0;i<notsa.length;i++){
                                dhtml+="<p>"+notsa[i]+"</p>";
                            }
                            ansref.innerHTML += "<div class='ans'><main>"+"<div style='padding:5px'><b>you can do</b></div><br>"+dhtml+"</main></div>";
                            break;
                       default:
                            var nots = [
                                "Google anything",
                                "Whatsapp Sanket",
                                "Read my schedule",
                                "Read Last Message",
                                "Youtube Search",
                                "Whatsapp Aniket",
                                "32 + 17",
                                "what is the temperature in mumbai",
                                "wikipedia anything. Eg. who is steve jobs",
                                "Turn on torch",
                                "Whatsapp Alok",
                                "Show memory usage",
                                "Tell me a joke"
                            ];
                            var dhtml = "";
                            var rdind = Math.trunc(Math.random()*(nots.length-4));
                            for(var i=0;i<4;i++){
                                dhtml+="<p>"+nots[rdind+i]+"</p>";
                            }
                           tts("Sorry! I did not recognize, By the way here are some things you can do",null);
                           ansref.innerHTML += "<div class='ans'><main>"+"<div style='padding:5px;'><b>By the way here are some things you can do</b></div><br>"+dhtml+"</main></div>";
                            //ansref.innerHTML+=;
                    }
                }
            }

            function bgtoggle(){

                var j=0;
                alert(cordova.plugins.backgroundMode.isActive());
                // if(cordova.plugins.backgroundMode.isActive()){
                //     cordova.plugins.backgroundMode.disable();
                // } else {
                //     cordova.plugins.backgroundMode.enable();
                // }
                            window.BackgroundService.start(
                function(fn) {  setInterval(function(){
                            j++;
                            document.getElementById("me").innerHTML= j+"min";
                        },1000);},
                function() { console.log('err') }
            )
            }
             
            function backbg(){
                chrome.system.cpu.getInfo(function(data){
                    alert("CPU");
                    alert(JSON.stringify(data));
                });
                
                setTimeout(recognizeSpeech,3000);
                cordova.plugins.backgroundMode.overrideBackButton();
            }
// function invokeBattery() {
//     if (ace.platform == "iOS") {
//         // Objective-C code:
//         // UIDevice* device = [UIDevice currentDevice];
//         // [device setBatteryMonitoringEnabled:true];
//         // double capacity = [device batteryLevel] * 100;

//         // Invoke a static currentDevice method on UIDevice
//         ace.NativeObject.invoke("UIDevice", "currentDevice", function (device) {
//             // On the returned instance, call an instance method with no return value
//             device.invoke("setBatteryMonitoringEnabled", true);
//             // Call another instance method that returns a double
//             device.invoke("batteryLevel", function (level) {
//                 alert("capacity = " + (level * 100) + "%");
//             });
//         });
//     }
//     else if (ace.platform == "Android") {
//         // Java code:
//         // BatteryManager batteryManager = getContext().getSystemService(Context.BATTERY_SERVICE);
//         // int capacity = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);

//         // Get the value of the string constant Context.BATTERY_SERVICE
//         ace.NativeObject.getField("android.content.Context", "BATTERY_SERVICE", function (constant) {
//             // Invoke an instance method on the Android context object to get a BatteryManager instance
//             ace.android.getContext().invoke("getSystemService", constant, function (batteryManager) {
//                 ace.NativeObject.getField("android.os.BatteryManager", "BATTERY_PROPERTY_CAPACITY", function (constant) {
//                     batteryManager.invoke("getIntProperty", constant, function (value) {
//                         alert("capacity = " + value + "%");
//                     });
//                 });
//             });
//         });
//     }
// }
            document.addEventListener("deviceready", onDeviceReady, true);
            function  openSchldrPage(){
                window.location.assign('./index.html#!/schedule')
            }
