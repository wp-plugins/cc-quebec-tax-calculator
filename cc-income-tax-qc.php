<?php

/*
Plugin Name: CC Quebec Income Tax Calculator
Plugin URI: http://incometax.calculatorscanada.ca/income-tax-widgets/
Description: Quebec Income Tax Calculator 2014
Version: 0.2014.1
Author: Calculators Canada
Author URI: http://calculatorscanada.ca/
License: GPL2

Copyright 2014 CalculatorsCanada.CA (info@calculatorscanada.ca)
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
*/

include 'cc-income-tax-qc-layout.php';


class cc_income_tax_qc extends WP_Widget {

	// constructor
	function __construct() {
		$options = array(		
			'name' => __('CC Quebec Tax Calculator','cctextdomain'), 
			'description' => __('Quebec Tax Calculator 2014','cctextdomain')
		);
		parent::__construct('cc_income_tax_qc', '', $options);
	}

	// widget form creation
	function form($instance) {	

        //print_r($instance);
        //print_r('Number: '.$this->number.' ');
        //print_r('ID: '.$this->id.' ');
        //print_r('id_base: '.$this->id_base.' ');

        $defaults = array(
            'title' => __('Quebec Tax Calculator 2014', 'cctextdomain'),
            'bg_color' => '#ffffff',
            'border_color' => '#000000',
            'text_color' => '#000000'
        );

        // Merge the user-selected arguments with the defaults
        $instance = wp_parse_args( (array) $instance, $defaults ); 

        extract($instance);
        if (!isset($allow_cc_urls)) $allow_cc_urls = 0;

		?>
        <script>
            var $J = jQuery.noConflict();
            $J(document).ready(function () {
              $J("#<?php echo $this->get_field_id('allow_cc_urls'); ?>").change(function(){
                    if($J(this).is(':checked')) {
                        $J("#<?php echo $this->id ?>-colors").attr('display', 'block');
                        $J("#<?php echo $this->id ?>-colors").show();
                    } else {
                        $J("#<?php echo $this->id ?>-colors").attr('display', 'none');
                        $J("#<?php echo $this->id ?>-colors").hide();
                    }
              })
            });
        </script>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
        <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
        </br>
        <input id="<?php echo $this->get_field_id('allow_cc_urls'); ?>" name="<?php echo $this->get_field_name('allow_cc_urls'); ?>" type='checkbox' <?php echo (( $allow_cc_urls == 1) ? "checked" : ""); ?> />
        <label for="<?php echo $this->get_field_id( 'allow_cc_urls' ); ?>"><?php _e( "customize colors and allow links to developer's website" ); ?></label> 
        </br>
        <span id='<?php echo $this->id."-colors"; ?>' <?php echo (( $allow_cc_urls == 0) ? "style='display:none;'" : ""); ?> >
            <label for="<?php echo $this->get_field_id( 'bg_color' ); ?>"><?php _e( 'Select background color:' ); ?></label> 
            </br>
            <input type="text" id="<?php echo $this->get_field_id('bg_color'); ?>" name="<?php echo $this->get_field_name('bg_color'); ?>" value="<?php echo esc_attr( $bg_color ); ?>" class='cc-color-field' />
            </br>
            <label for="<?php echo $this->get_field_id( 'border_color' ); ?>"><?php _e( 'Select border color:' ); ?></label> 
            </br>
            <input type="text" id="<?php echo $this->get_field_id('border_color'); ?>" name="<?php echo $this->get_field_name('border_color'); ?>" value="<?php echo esc_attr( $border_color ); ?>" class='cc-color-field' />
            </br>
            <label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Select text color:' ); ?></label> 
            </br>
            <input type="text" id="<?php echo $this->get_field_id('text_color'); ?>" name="<?php echo $this->get_field_name('text_color'); ?>" value="<?php echo esc_attr( $text_color ); ?>" class='cc-color-field' />
        </span>
		</p>

		<?php 	
	}

	// widget update
	function update($new_instance, $old_instance) {
        // Hex color code regular expression
        $hex_color_pattern = "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/"; 

		$instance = $old_instance;
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : $instance['title'];

        $instance['bg_color'] = ( preg_match($hex_color_pattern, $new_instance['bg_color']) ) ? $new_instance['bg_color'] : "#ffffff";
        $instance['border_color'] = ( preg_match($hex_color_pattern, $new_instance['border_color']) ) ? $new_instance['border_color'] : "#000000";
        $instance['text_color'] = ( preg_match($hex_color_pattern, $new_instance['text_color']) ) ? $new_instance['text_color'] : "#000000";
        $instance['allow_cc_urls'] = ($new_instance['allow_cc_urls'] == "on") ? 1 : 0;
		return $instance;
	}

	// widget display
	function widget($args, $instance) {

       //  print_r($args);

        extract($instance);

		echo $args['before_widget'];
		if ( $allow_cc_urls && !empty($title))
			 $title = '<a href="http://incometax.calculatorscanada.ca/Quebec" target="_blank" style="text-decoration:none">' . $title . '</a>';		
		load_cc_income_tax_qc_calc($this->id, $title,  $allow_cc_urls, $bg_color, $border_color, $text_color);
		echo $args['after_widget'];
	}
}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("cc_income_tax_qc");'));


// load widget style and javascript files
function cc_income_tax_qc_scripts() {
	wp_register_style( 'cc-income-tax-qc', plugins_url('/cc-income-tax-qc.css',__FILE__)); 
	wp_enqueue_style( 'cc-income-tax-qc' );
    wp_enqueue_script( 'cc-income-tax-qc', plugins_url('/cc-income-tax-qc.js',__FILE__), array('jquery'), '0.1.0', true );
}

add_action( 'wp_enqueue_scripts', 'cc_income_tax_qc_scripts' );


function cc_income_tax_qc_admin( $hook_suffix ) {
    // http://make.wordpress.org/core/2012/11/30/new-color-picker-in-wp-3-5/
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_script( 'cc-income-tax-qc-admin', plugins_url('cc-income-tax-qc-admin.js', __FILE__ ), array( 'wp-color-picker' ), false, true );
}

add_action( 'admin_enqueue_scripts', 'cc_income_tax_qc_admin' );


?>