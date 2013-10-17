<?php   
    function url_title_canonical($str, $separator = 'dash', $lowercase = FALSE,$options = null){ 
    if ($separator == 'dash') { 
        $search        = '_'; 
        $replace    = '-'; 
    } elseif($separator =='spaceChar'){
        $search        = '_'; 
        $replace    = '-'; 
    }else { 
        $search        = '-'; 
        $replace    = '_'; 
    } 

    $trans = array( 
                $search                 => $replace, 
                "á"                     => 'a', 
                "é"                     => 'e', 
                "í"                     => 'i', 
                "ó"                     => 'o', 
                "ú"                     => 'u', 
                "Á"                     => 'A', 
                "É"                     => 'E', 
                "Í"                     => 'I', 
                "Ó"                     => 'O', 
                "Ú"                     => 'U', 
                "ñ"                     => 'n', 
                "Ñ"                     => 'Ñ', 
                "ä"                     => 'a', 
                "ë"                     => 'e', 
                "ï"                     => 'i', 
                "ö"                     => 'o', 
                "ü"                     => 'u', 
                '&\#\d+?;'                => '', 
                '&\S+?;'                => '', 
                '\s+'                    => $replace, 
                '[^a-z0-9\-\._]'        => '', 
                $replace.'+'            => $replace, 
                $replace.'$'            => $replace, 
                '^'.$replace            => $replace, 
                '\.+$'                    => '' 
               ); 
    $str = strip_tags($str); 

    foreach ($trans as $key => $val) 
    { 
        $str = preg_replace("#".$key."#i", $val, $str); 
    } 

    if ($lowercase === TRUE) 
    { 
        $str = strtolower($str); 
    } 
   
//    return trim(stripslashes($str)); 
    $str=trim(stripslashes($str));
    if (isset($options['prefix']))
        $str = $options['prefix'] .'-'. $str;
    if (isset($options['suffix']))
        $str = $str .'-'. $options['suffix'];
    
     return $str;
}
