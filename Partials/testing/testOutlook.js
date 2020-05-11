   var myApp = new ActiveXObject('Outlook.Application') 
   var myDom = myApp.GetNamespace("MAPI")
   var myCal = myDom.GetDefaultFolder(9)
   var DSC   = 'Descripcion de la Actividad'
   var PRY   = 'Nombre del Proyecto'
   var ACT   = 'Tipo de Actividad'
   var TXT   = 'Texto de la Actividad'
   var EID   = ''
   var STA   = '4'
   var FI    = '01/08/2006'
   var HI    = '12:00'
   var FF    = '01/08/2006'
   var HF    = '14:00'
   var myItm = (((EID=='')||(!myDom.GetItemFromID(EID)))?myApp.CreateItem(1):myDom.GetItemFromID(EID))
   if (myItm) {
      myItm.ReminderSet = (STA==1)
      myItm.Subject     = DSC+' ['+PRY+' - '+ACT+']'
      myItm.Start       = FI+' '+HI
      myItm.End         = FF+' '+HF
      myItm.Body        = TXT
      myItm.Save()
      EID				= myItm.EntryID
	  WScript.Echo('Se genero la cita con Entry ID = '+EID)
   }