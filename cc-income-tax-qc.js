var $J = jQuery.noConflict();


$J( document ).ready(function() {
	// runtime events
	
	$J(".income").keydown(function(event) {
		if(!(isIntegerKey(event))) event.preventDefault();
	});	

	$J(".income").keyup(function( ) {
		calculate_income_tax_qc($J(this).closest("aside").attr("id"));
	});

});

function format_id(id,name)
{
    
};

function calculate_income_tax_qc(id)
{
    var income_id = '#' + id + '-' + 'income';
	var income = $J(income_id).val();
	
    // clear output
	$J('#' + id + '-' + 'ProvincialTax').html("");
	$J('#' + id + '-' + 'FederalTax').html("");
	$J('#' + id + '-' + 'TotalTax').html("");
	$J('#' + id + '-' + 'AverageRate').html("");
	$J('#' + id + '-' + 'AfterTaxIncome').html("");

	// if no data entered
	if (isNaN(income) || income == "") return;
	
    // calculate QC provincial taxes 2013
	ProvincialTax = 0; 
    tmpIncome = income;
    if (tmpIncome > 100000) { ProvincialTax += (tmpIncome - 100000) * 25.75 / 100; tmpIncome = 100000; }
    if (tmpIncome > 82190) { ProvincialTax += (tmpIncome - 82190) * 24 / 100; tmpIncome = 82190; }
    if (tmpIncome > 41095) { ProvincialTax += (tmpIncome - 41095) * 20 / 100; tmpIncome = 41095; }
    if (tmpIncome > 13994) { ProvincialTax += (tmpIncome - 13994) * 16 / 100; }

    // calculate Canadian federal taxes 2013
    FederalTax = 0;
    tmpIncome = income;
    if (tmpIncome > 135054) { FederalTax += (tmpIncome - 135054) * 24.22 / 100; tmpIncome = 135054; }
    if (tmpIncome > 87123) { FederalTax += (tmpIncome - 87123) * 21.71 / 100; tmpIncome = 87123; }
    if (tmpIncome > 43561) { FederalTax += (tmpIncome - 43561) * 18.37 / 100; tmpIncome = 43561; }
    if (tmpIncome > 11038) { FederalTax += (tmpIncome - 11038) * 12.53 / 100; }

    TotalTax = ProvincialTax + FederalTax;
	AverageRate = TotalTax / income * 100;
	if (isNaN(AverageRate)) AverageRate = 0;
	AfterTaxIncome = income - TotalTax;
	
	$J('#' + id + '-' + 'ProvincialTax').html(round2TwoDecimals(ProvincialTax));
	$J('#' + id + '-' + 'FederalTax').html(round2TwoDecimals(FederalTax));
	$J('#' + id + '-' + 'TotalTax').html(round2TwoDecimals(TotalTax));
	$J('#' + id + '-' + 'AverageRate').html(round2TwoDecimals(AverageRate));
	$J('#' + id + '-' + 'AfterTaxIncome').html(round2TwoDecimals(AfterTaxIncome));
	   
};


function isIntegerKey(evt)	  
      {
         var key = evt.which || evt.which || event.keyCode;
		 // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
		 var isInteger = (key == 8 || 
                key == 9 ||
                key == 46 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
		return isInteger;
				
      };
	  
function isDecimalKey(e, number)
      {
         var key = (e.which) ? e.which : e.keyCode;
		 // numbers (48-57 and 96-105), dot (110,190), comma (44,188), backspace(8), tab (9), navigation keys (35-40), DEL(46)
		 if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 110 || key == 190 || key == 8 || key == 9 || (35 <= key && key <= 40) || key == 46 )  
		 	{
			 		  if (key == 110 || key == 190)
					  {
					   	 // skip it if comma or decimal point already entered or it is empty field yet
						 if (number.indexOf(".") > -1 || number.indexOf(",") > -1 || number.length == 0) 
						 	return false; 
					  }
			          return true;
			}

         return false;
      };

function radioValue(element)	  
		 {
		    var returnValue = "";
            var radios = document.getElementsByName(element);
            
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    returnValue = radios[i].value;
                }
			}
			return returnValue;	
		 };	  	
function round2TwoDecimals(number)
		 {
 		    return Math.round(number*100)/100						 
		 };	
 



