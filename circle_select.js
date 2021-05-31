var multi_drop_obj = {};

		function circle_select(toggleValue=false){
			// debugger;
			var toggleText = (toggleValue)?'Unselect All':'Select All';
			$(".btn-circle-select").remove();
			$('.items_list').remove();
			$('.circleDiv').remove();
			var selects = $('.circle_select');
			$.each(selects,function(k,v){
				var current_select = v;
				$(current_select).hide();
				var current_id = current_select.id
				if(current_id){
					// this div is to show avatars
					$(current_select).parent().append('<div class="items_list"></div>');

					// adding dropdown div
					var dropdown_div = '<div class="dropdown circleDiv" style="display: inline-block;"><button class="btn btn-default btn-circle-select dropdown-toggle add_button" type="button"><i class="glyphicon glyphicon-plus" onclick="showDropdown(this)"></i></button><div class="dropdown-menu multi_select_dropdown">';

					var list_options = {};
					if($(current_select).children().length > 0){
						dropdown_div += '<div class="row notification_row selectAllRow" data-select_id="'+current_id+'" style="height: auto;width: auto;"><div class="col-md-12"><div class="col-md-12 list_item"><span class="highlight text-center item_name" onclick="selectAllToggle(this)" data-value="'+toggleValue+'"> '+toggleText+' </span></div> </div></div>';
					}

					$.each($(current_select).children(),function(k,v){
						//debugger;
						var code = v.value;
						var item_name = $(v).text();
						var item_img_src = $(v).data('img_src');
						if(item_img_src == undefined || item_img_src == ''){
							item_img_src = 'https://image.flaticon.com/icons/svg/262/262122.svg';
						}

						// populating dropdown div created above
						dropdown_div += '<div class="row notification_row '+code+'" data-select_id="'+current_id+'" style="height: auto;width: auto;"><div class="col-md-12"><div class="col-md-2"><img class="item_img img-circle avatar-pic" src="'+item_img_src+'"></div><div class="col-md-8 list_item"><span class="highlight item_name" onclick="add_item(this)"> '+item_name+' </span></div> <div class="col-md-2 remove_item_div"></div> </div></div>';

						// creating an object to manage all selects
						if( !(code in multi_drop_obj) ){
							
							if($(v).is(':selected')){
								status = 'active';
							}else{
								status = 'not_active';
							}
							// creating the options and its status to object
							list_options[code] = {'name':item_name,'img':item_img_src,'status':status};
						}
					})
					multi_drop_obj[current_id] = list_options;

					dropdown_div += '</div></div>';
					$(current_select).parent().append(dropdown_div);

				}else{
					alert('please give your dropdown an id');
				}

				manage_circle_content(current_id);
			});
		}
		
		function manage_circle_content(current_id){
			//debugger;
			var items_div = $($('#'+current_id).parent()).find('.items_list');
			var current_object = multi_drop_obj[current_id];
			if(Object.keys(current_object).length > 0){
				$(items_div).text('');
				$(".list_close_btn").remove();

				$.each(current_object,function(k,v){
					if(v.status == 'active'){
						// add avatar to div
						$(items_div).append('<img src="'+v.img+'" title="'+v['name']+'" class="img-circle avatar-pic">');
						//debugger;
						// add x button to listing
						var dropdown_div = $("."+k);
						$(dropdown_div).find('.remove_item_div').append('<button type="button" onclick="remove_item(this)" class="close list_close_btn" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
					}
				});
			}
			// if(do_hide){
			// 	$($(items_div).parent().find('.dropdown')[1]).removeClass('open')
			// }else{
			// 	$($(items_div).parent().find('.dropdown')[1]).addClass('open')
			// }
		}


		function add_item(target){
			// debugger;
			var code = $($($(target).parent()).parent()).parent()[0].classList[2];
			var select_id = $($($($(target).parent()).parent()).parent()[0]).data('select_id');

			multi_drop_obj[select_id][code].status = 'active';
			$('#'+select_id+' option[value='+code+']').prop('selected',true);
			manage_circle_content(select_id);
			//debugger;
			// to not hide the item dropdown
			// debugger;
			// var items_div = $($('#'+select_id).parent()).find('.items_list');
			// $($($(items_div[0]).parent()[0]).find('.multi_select_dropdown')).show();
		}



		function remove_item(target){
			//debugger;
			var code = $($($(target).parent()).parent()).parent()[0].classList[2];
			var select_id = $($($($(target).parent()).parent()).parent()[0]).data('select_id');

			multi_drop_obj[select_id][code].status = 'not_active';
			$('#'+select_id+' option[value='+code+']').prop('selected',false);
			manage_circle_content(select_id);
			//delete multi_drop_obj[code];
			/*update_avatars();
			update_list();*/
		}
