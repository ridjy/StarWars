<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use GuzzleHttp\Client;

class RechercheController extends AbstractController
{
    private const API_URI = 'swapi.dev/api/';

    #[Route('/recherche', name: 'app_recherche')]
    public function index(Request $request): Response
    {
        $filtre = $request->request->get('filtre');
        $recherche = $request->request->get('recherche');
        $correspondances = ['Planètes' => 'planets',
            'Vaisseaux' => 'starships',
            'Véhicules' => 'vehicles',
            'Personnages' => 'people',
            'Films' => 'films',
            'Espèces' => 'species',
        ]; 
        $titre = array_search($filtre,$correspondances);
        //pagination recherche à faire 
        $endpoint = $filtre.'/?search='.$recherche;
        //ne pas verifier le certificat pour des tests en local
        $client = new Client([
            'verify' => false,
            'base_uri' => self::API_URI ] );
        $response = $client->request('GET', $endpoint);
        $body = $response->getBody()->getContents();
        return $this->render('recherche/index.html.twig', [
            'filtre' => $filtre,
            'recherche' => $recherche,
            'filtre_titre' => $titre,
            'result' => $body
        ]);
    }
}
