var BxSrvChain = [];


/*****************************************************
 ******************** BXParameter ********************
 *****************************************************/
function BXParameter(name, value, type){
    this.Name = name;
    this.Value = value;
    this.Type = type;
}
BXParameter.prototype.Name = 'Nombre del parámetro';
BXParameter.prototype.Value = 'Valor del parámetro';
BXParameter.prototype.Type = 'Tipo de datos del parámetro';
BXParameter.prototype.toString = function(){
    var str = '[' + this.Name + ', ' + this.Value;
    if (this.Type){
        str += ', ' + this.Type;
    }

    str += ']';
    return str;
};

/*****************************************************
 ************ AngularJS -> Buxis.Services ************
 *****************************************************/

        /*****************************************************
         ********************* BXService *********************
         *****************************************************/

        function BXService(serviceId, serviceType, parameters){
            this.Id = serviceId;
            this.Type = serviceType;
            this.Parameters = parameters;
            this.Request = "";
            this.Error = "";
            this.Success = true;
            this.Results = [];
            this.ResultType = [];
            this.ChainId = 0;

            var currentLocation = window.location;

            this.URL = '/buxis/Partials/asp/bxbroker.asp';
        }
        BXService.prototype.Id = 'Identificador del servicio';
        BXService.prototype.Parameters = 'Colección de parámetros de entrada del servicio';
        BXService.prototype.Type = 'Tipo del servicio';

        BXService.prototype.BXUser = function() {
            return{
                username:'',
                name:'',
                passw:''
            };
        };

        BXService.prototype.toString = function(){
            var s = 'Id: ' + this.Id + '\n';
            s += 'Type: ' + this.Type + '\n';
            if (this.Parameters.length > 0){
                s += 'Parameters: \n';
                for (var p in this.Parameters){
                    s += '\t' + this.Parameters[p].toString() + '\n';
                }
            }
            s += 'Request: ' + this.Request + '\n';
            s += 'Results: ' + this.Results[0] + '\n';
            return s;
        };
        BXService.prototype.buildRequest = function(){
            var parametersStr = '';
            if (this.Parameters){
                for (var i in this.Parameters){
                    parametersStr += '<PARAMETER ID="@paramId@">@paramVal@</PARAMETER>';
                    parametersStr = parametersStr.replace("@paramId@", this.Parameters[i].Name).replace("@paramVal@", this.Parameters[i].Value);
                }
            }

			//var C_TKN = getCookie("TOKEN");
			var C_TKN = ""

            var reqStr = '<?xml version="1.0"?>'+
                '<SERVICE ID="@srvId@" TYPE="@srvType@" FORMAT="json" TOKEN="'+C_TKN+'">' +
                '<PARAMETERS>' +
                parametersStr +
                '</PARAMETERS>' +
                //'<KEYS/>' +
                '</SERVICE>';

            this.Request = reqStr.replace("@srvId@", this.Id).replace("@srvType@", this.Type);
        };

        BXService.prototype.BuildResult = function(result){
            var dataSet, dataDef;
            result = result.replace(/\n/g,'~n~');
            result = result.replace(/\r/g,'~r~');
            var resultObj = JSON.parse(result);
            	if ((resultObj.ERROR != undefined && resultObj.ERROR != null) || (resultObj.error != undefined && resultObj.error != null)){
            		this.Success = false;
            		if (resultObj.ERROR != undefined && resultObj.ERROR != null){
						if (resultObj.ERROR.description != undefined && resultObj.ERROR.description != null){
							this.Error = resultObj.ERROR.description;
						}else{
							this.Error = resultObj.ERROR;
						}
					}else{
						if (resultObj.error.description != undefined && resultObj.error.description != null){
							this.Error = resultObj.error.description;
						}else{
							this.Error = resultObj.error;
						}
					}
					this.Error = this.Error.replace(/~n~/g,String.fromCharCode(10));
					BXScript('CITI.AFTER_ERROR', [], null, null, function(){null;});
					//this.Error = this.Error.replace(/~r~/g,'\\\r');
            	}else{
					//if (this.Type == "DATA" && (resultObj.type == undefined || resultObj.type == null || resultObj.data == "undefined" || resultObj.data == null)){
					if (this.Type == "DATA" && (resultObj.type == undefined || resultObj.type == null)){
						this.Success = false;
						this.Error = "Formato de respuesta del servicio incorrecto";
					}else{
						dataDef = resultObj.type;
						if (dataDef)
							this.ResultType = dataDef;

						if (resultObj.data != undefined && resultObj.data != null){
							if (resultObj.data.length > 0 && resultObj.data[0].ERROR) {
								this.Success = false;
								this.Error = resultObj.data[0].ERROR;
							} else {
								dataSet = resultObj.data;
								if (dataSet){
									this.Results = dataSet;
									// Convertir Datos: Fechas
									var do_conv = false;

									for(srvType=0;srvType<this.ResultType.length;srvType++){
										if ((ConvertDataType(this.ResultType[srvType].type) == "date") || (ConvertDataType(this.ResultType[srvType].type) == "text")){
											do_conv = true;
										}
									}
									if (do_conv){
										var dat_typ = '';
										for(srvRes=0;srvRes<this.Results.length;srvRes++){
											for(srvType=0;srvType<this.ResultType.length;srvType++){
												if (this.Results[srvRes][this.ResultType[srvType].name] != undefined && this.Results[srvRes][this.ResultType[srvType].name] != null){
													switch(ConvertDataType(this.ResultType[srvType].type)){
														case "date":
																this.Results[srvRes][this.ResultType[srvType].name] = ConvertDateFromSrv(this.Results[srvRes][this.ResultType[srvType].name]);
															break;
														case "text":
															var sres = this.Results[srvRes][this.ResultType[srvType].name].replace(/~n~/g,String.fromCharCode(10));
															//sres = sres.replace(/~r~/g,'\\\r');
															this.Results[srvRes][this.ResultType[srvType].name] = sres;
															//this.Results[srvRes][this.ResultType[srvType].name] = this.Results[srvRes][this.ResultType[srvType].name].replace(/~n~/g,String.fromCharCode(10));
															break;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


        /*****************************************************
         ********************** BXScript *********************
         *****************************************************/
        function BXScript(name, parameters, onSuccess, onSuccessParams, onError,debugDetail){
        	BXLaunchSrv(name, 'SCRIPT', parameters, onSuccess, onSuccessParams, onError,debugDetail);
        }

        function BXData(name, parameters, onSuccess, onSuccessParams, onError, debugDetail){
		        	BXLaunchSrv(name, 'DATA', parameters, onSuccess, onSuccessParams, onError,debugDetail);
        }

        function BXMenu(name, parameters, onSuccess, onSuccessParams, onError,debugDetail){
			BXLaunchSrv(name, 'MENU', parameters, onSuccess, onSuccessParams, onError,debugDetail);
        }


        function BXLaunchSrv(name, srvtype, parameters, onSuccess, onSuccessParams, onError, debugDetail){
            var srv = new BXService(name, srvtype, parameters);
            srv.buildRequest();
            srv.ChainId = BxSrvChain.AddService();
            var srvPost = $.post(srv.URL,srv.Request);

            srvPost.done(function(data){
				if (debugDetail){
					alert('Pedido:' + srv.Request);
				}
				BxSrvChain.DelService(srv.ChainId);
                srv.BuildResult(data);
                if (srv.Success) {
                    if (onSuccess != null && onSuccess != undefined) {
                    	if (onSuccessParams != null && onSuccessParams != undefined){
                    		onSuccess.call(srv, onSuccessParams);
                    	}else{
                    		onSuccess.call(srv);
                    	}
                    }
                }else{
                    if (onError != null && onError != undefined) {
                        onError.call(srv, srv.Error);
                    }else{
                        Error(srv.Error, 'Request: ' + srv.Request + '\nResult: ' + data);
                    }
                }
            });

            srvPost.fail(function(jqXHR,textStatus,errorThrown){
            	BxSrvChain.DelService(srv.ChainId);
                if (onError != null && onError != undefined){
                    srv.Success = false;
                    srv.Error = errorThrown;
                    onError.call(srv,errorThrown);
                }else{
                    srv.Success = false;
                    srv.Error = errorThrown;
                    Error('Error en la comunicación con el servidor: ' + errorThrown, 'Request:' + srv.Request);
                }
            });

        };

    /*****************************************************
     ****************** Services Chains *****************
     *****************************************************/

    BxSrvChain.OnEnd = new Function();

	BxSrvChain.AddService = function(){

		var maxId = 0;
		for(ser=0;ser<this.length;ser++){
			if (this[ser] > maxId){
				maxId = this[ser];
			}
		}
		maxId++;
		this.push(maxId);

		return maxId;
	}

	BxSrvChain.DelService = function(serviceId){
		for(ser=0;this.length;ser++){
			if(this[ser]==serviceId){
				this.splice(ser,1);
				break;
			}
		}
		if (!BxSrvChain.Active()){
			BxSrvChain.OnEnd.call();
			BxSrvChain.OnEnd = new Function();
		}

	}

	BxSrvChain.Active = function(){
		if (this.length > 0){
			return true;
		}
		return false;
	}

	function SetSrvChainEndFunc(func){
		if (func != undefined && func != null){
			BxSrvChain.OnEnd = func;
		}else{
			BxSrvChain.OnEnd = new Function();
		}
		if (!BxSrvChain.Active()){
			BxSrvChain.OnEnd.call();
			BxSrvChain.OnEnd = new Function();
		}
	}




    /*****************************************************
     ****************** Others functions *****************
     *****************************************************/
    function BXFormatDate(value){
        var n= value.indexOf("T");
        if(n >=0)
            return value.substring(0,n);
        else
            return value;
    };

	function ConvertDataType(srcType){
		switch (srcType){
			case "numeric":
			case "int":
				return "number";
				break;
			case "char":
			case "varchar":
			case "text":
				return "text";
		}
		return srcType;
	}

	function ConvertDateFromSrv(inSrvDate){
		var newDateStr = "";
		var d;

		if (inSrvDate != null && inSrvDate != undefined && inSrvDate != ""){
			try{
				//d = new Date(inSrvDate);
				//day = d.getDate();
				//mon = d.getMonth() + 1;
				//year = d.getFullYear();
				year = inSrvDate.substring(0,4);
				mon = inSrvDate.substring(5,7);
				day = inSrvDate.substring(8,10);
				newDateStr = strPadLeft(String(day),'0',2) + pkDateSeparator + strPadLeft(String(mon),'0',2) + pkDateSeparator + String(year);
			}catch(e){
				Error(e.message);
			}
		}

		return newDateStr;
	}

	function ConvertDateToSrv(inDate){
		var newDateStr = "";
		if (inDate != null && inDate != undefined && inDate != ""){
			day = inDate.substring(0,2);
			mon = inDate.substring(3,5);
			year = inDate.substring(6,10);
			newDateStr = String(year) + "-" + strPadLeft(String(mon),'0',2) + "-" + strPadLeft(String(day),'0',2);
		}
		return newDateStr;
	}


