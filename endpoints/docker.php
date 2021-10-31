<?php
$docroot = $docroot ?? $_SERVER['DOCUMENT_ROOT'] ?: '/usr/local/emhttp';

require_once "$docroot/plugins/dynamix.docker.manager/include/DockerClient.php";


if (!isset($_GET['id']) || !isset($_GET['action'])) {
  header("HTTP/1.0 404 Not Found");
  die();
}

$client = new DockerClient();
$response = false;

switch($_GET['action']) {
  case 'start':
      $response = $client->startContainer($_GET['id']);
    break;
  case 'restart':
      $response = $client->restartContainer($_GET['id']);
    break;
  case 'stop':
      $response = $client->stopContainer($_GET['id']);
    break;
  case 'pause':
      $response = $client->pauseContainer($_GET['id']);
    break;
}
$client->flushCaches();
echo json_encode([ $_GET['id'] => $response ]);


