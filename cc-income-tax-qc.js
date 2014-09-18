var $J = jQuery.noConflict();


$J( document ).ready(function() {
	// runtime events
	
	$J(".qc-income").keydown(function(event) {
		if(!(isIntegerKey(event))) event.preventDefault();
	});	

	$J(".qc-income").keyup(function( ) {
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
	
    // calculate QC provincial taxes 2014
	ProvincialTax = 0; 
    tmpIncome = income;
    if (tmpIncome > 100970) { ProvincialTax += (tmpIncome - 100970) * 25.75 / 100; tmpIncome = 100970; }
    if (tmpIncome > 82985) { ProvincialTax += (tmpIncome - 82985) * 24 / 100; tmpIncome = 82985; }
    if (tmpIncome > 41495) { ProvincialTax += (tmpIncome - 41495) * 20 / 100; tmpIncome = 41495; }
    if (tmpIncome > 14131) { ProvincialTax += (tmpIncome - 14131) * 16 / 100; }

    // calculate Canadian federal taxes 2014
    FederalTax = 0;
    tmpIncome = income;
    if (tmpIncome > 136270) { FederalTax += (tmpIncome - 136270) * 24.22 / 100; tmpIncome = 136270; }
    if (tmpIncome > 87907) { FederalTax += (tmpIncome - 87907) * 21.71 / 100; tmpIncome = 87907; }
    if (tmpIncome > 43953) { FederalTax += (tmpIncome - 43953) * 18.37 / 100; tmpIncome = 43953; }
    if (tmpIncome > 11138) { FederalTax += (tmpIncome - 11138) * 12.53 / 100; }

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
 



