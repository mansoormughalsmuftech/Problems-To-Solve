                    let remover_counter = 0;
                    let added_check_collisions_result;
                    let previous_model_position_x;
                    let previous_value = document.getElementById(unique_select_id).value;
                    let changed_cube;
                    let added_drag_controls;
                    let changed_addon_model;
                    document.getElementById(unique_select_id).addEventListener('change',function(event) {
                        
                        if(remover_counter == 0){
                            group.remove(addon_model);
                            cube_group.remove(cube);
                            drag_controls.deactivate();
                            previous_model_position_x  = addon_model.position.x;
                            // console.log(addon_model);
                        }
                        loadAddons(model_position, event.target.value).then((result_model) => {

                            changed_addon_model = result_model;

                            changed_addon_model.position.x = previous_model_position_x;
                            changed_cube = makeCube(changed_addon_model);
                            cube_group.add(changed_cube);

                            added_check_collisions_result =  checkCollisions(changed_addon_model,changed_cube,cube_group);
                            
                            
                            if(added_check_collisions_result == false){
                                remover_counter++;

                                console.log("No collison");
                                
                                previous_value = event.target.value;
                                added_drag_controls = attachDragControls(changed_cube,changed_addon_model, addons_limit, model_position, selected_size_width,camera,rendererDomElement,controls,cube_group,unique_id,unique_delete_id,previous_model_position_x);



                                added_drag_controls.addEventListener('dragend', function (event) {previous_model_position_x = event.object.position.x});
                            
                                group.add(changed_addon_model);
                                cube_group.add(changed_cube);
                                document.getElementById(unique_delete_id).addEventListener('click', function(event) {
                                    event.target.parentNode.remove();
                                    group.remove(changed_addon_model);
                                    cube_group.remove(changed_cube);
                                    added_drag_controls.deactivate();
                                },{once:true});

                                document.getElementById(unique_select_id).addEventListener('change', function(event) {

                                    if(added_check_collisions_result == false){
                                        console.log('Deleted');
                                        group.remove(changed_addon_model);
                                        cube_group.remove(changed_cube);
                                        added_drag_controls.deactivate();
                                    }
                                });

                            }else{
                                console.log('Collision detected, reverting selection');
                                event.target.value = previous_value;                                
                                //changed cube was not removing on collision when changing size of the addon model so it is removed here.
                                cube_group.remove(changed_cube);

                                //reverting the previous models on collision
                                if(remover_counter == 0){
                                    cube_group.add(cube);
                                    group.add(addon_model);
                                    drag_controls.activate();
                                }else{
                                    console.log(changed_cube);
                                    console.log(changed_addon_model);
                                    console.log(added_drag_controls);
                                    

                                    // cube_group.add(changed_cube);
                                    // group.add(changed_addon_model);
                                    // added_drag_controls.activate();
                                }
                                
                            }
                        });
                    });
