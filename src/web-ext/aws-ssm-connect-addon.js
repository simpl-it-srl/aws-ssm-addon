(function() {
    'use strict';
    var $ = window.jQuery;
    // if (window.top == window.self)
    //     return;
    var compute_react=$(document).find("#compute-react");
    if(compute_react.length > 0){
        console.log(compute_react);
        var targetNode = document.getElementById('compute-react');

        // Options for the observer (which mutations to observe)
        var config = { attributes: true, childList: true };

        // Callback function to execute when mutations are observed
        var callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList' && mutation.removedNodes.length==0 && mutation.addedNodes.length>0 && $(mutation.addedNodes[0]).hasClass("awsui")) {
                    var initial_connect_button=$(mutation.addedNodes[0]).find("span:contains('Connect')").parent();
                    var forward_button_parent=initial_connect_button.parent().clone();
                    var connect_button_parent=initial_connect_button.parent().clone();
                    var forward_button=forward_button_parent.find("button");
                    var connect_button=connect_button_parent.find("button");
                    forward_button_parent.insertAfter(initial_connect_button.parent());
                    connect_button_parent.insertAfter(initial_connect_button.parent());
                    connect_button.find('span').html('Connect WSL');
                    forward_button.find('span').html('Forward');
                    initial_connect_button.attrchange({
                        trackValues: true, /* Default to false, if set to true the event object is
                updated with old and new value.*/
                        callback: function (event) {
                            if(event.newValue == undefined && event.attributeName == 'disabled'){
                                forward_button.removeAttr('disabled');
                                connect_button.removeAttr('disabled');
                            }else{
                                forward_button.attr('disabled');
                                connect_button.attr('disabled');
                            }
                            if( event.attributeName == 'class'){
                                forward_button.attr('class', event.newValue);
                                connect_button.attr('class', event.newValue);
                            }

                        }
                    })
                    connect_button.click(function(e){
                        e.preventDefault();
                        var instance_id;
                        var profile_var;
                        if($(".instancesTable").length > 0){
                            var table = $(".instancesTable").find("table");
                            instance_id=table.find( 'tbody' ).find( 'tr' ).find('td').has( 'label span span span input[type=checkbox]:checked' ).next().next().text();
                        }
                        if($("nav ol").find('li').length>3){
                            instance_id=$("nav ol").find('li').last().find('div').find('span').find('span').text();
                         }
                        profile_var=$("#nav-usernameMenu", window.parent.document).find(`[data-testid='awsc-nav-account-menu-button']`).children().eq(1).text();
                        if (profile_var.match(/[a-zA-Z0-9]*-[a-zA-Z0-9]*/) ){
                            profile_var= window.prompt('Please set the profile you want to use with the instance',profile_var);
                        }
                        var url= "ext+wsl2:'connect "+ profile_var +" "+instance_id+"'";
                        window.location.href=url

                    });
                    forward_button.click(function(e){
                        e.preventDefault();
                        var instance_id
                        var profile_var;
                        if($(".instancesTable").length > 0){
                            var table = $(".instancesTable").find("table");
                            instance_id=table.find( 'tbody' ).find( 'tr' ).find('td').has( 'label span span span input[type=checkbox]:checked' ).next().next().text();
                        }
                        if($("nav ol").find('li').length>3){
                            instance_id=$("nav ol").find('li').last().find('div').find('span').find('span').text();
                         }
                        var internalPort = window.prompt('Please set the port you want to use locally',"33389");
                        var externalPort = window.prompt('Please set the port you want to use on the instance',"3389");
                        profile_var=$("#nav-usernameMenu", window.parent.document).find(`[data-testid='awsc-nav-account-menu-button']`).children().eq(1).text();
                        if (profile_var.match(/[a-zA-Z0-9]*-[a-zA-Z0-9]*/) ){
                            profile_var= window.prompt('Please set the profile you want to use with the instance',profile_var);
                        }
                        var url= "ext+wsl2:'forward "+ $("#nav-usernameMenu", profile_var+" "+instance_id+" "+internalPort+" "+externalPort+"'";
                        window.location.href=url

                    });
                }

            }
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);


    }
})();
