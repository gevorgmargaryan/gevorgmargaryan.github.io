<?php

function getSt($site)
{
    $host = 'https://graph.facebook.com/';

    $ch = curl_init($host . $site);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $res = curl_exec($ch);

    $data = json_decode($res, true);
    curl_close($ch);

    return $data;
}

$site = 'https://google.com';
$data = getSt($site);
var_dump($data);
