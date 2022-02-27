<?php

//l'url à ajouter dans le lien
$res = 524;
$res2 = $_COOKIE["idRessource"];
if($res2 != null){
    $res = $res2;
}

//LE RESTE EST HONTEUSEMENT VOLÉ SUR STACK OVERFLOW
//ça fait une requête propre qui récupère le fichier ical à partir de l'univ

// Set the url of the calendar feed.
$url = 'http://planning.univ-lemans.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources='.$res.'&projectId=1&calType=ical&nbWeeks=4';

/*****************************************/

// Run the helper function with the desired URL and echo the contents.
echo get_url($url);

// Define the helper function that retrieved the data and decodes the content.
function get_url($url)
{
    //user agent is very necessary, otherwise some websites like google.com wont give zipped content
    $opts = array(
        'http'=>array(
            'method'=>"GET",
            'header'=>"Accept-Language: en-US,en;q=0.8rn" .
                        "Accept-Encoding: gzip,deflate,sdchrn" .
                        "Accept-Charset:UTF-8,*;q=0.5rn" .
                        "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:19.0) Gecko/20100101 Firefox/19.0 FirePHP/0.4rn"
        )
    );

    $context = stream_context_create($opts);
    $content = file_get_contents($url ,false,$context);

    //If http response header mentions that content is gzipped, then uncompress it
    foreach($http_response_header as $c => $h)
    {
        if(stristr($h, 'content-encoding') and stristr($h, 'gzip'))
        {
            //Now lets uncompress the compressed data
            $content = gzinflate( substr($content,10,-8) );
        }
    }

    return $content;
}


