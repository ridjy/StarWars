<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use GuzzleHttp\Client;

class AccueilController extends AbstractController
{
    private const API_URI = 'swapi.dev/api/';

    #[Route('/', name: 'app_accueil')]
    public function index(): Response
    {
        $titre = 'Planètes'; $filtre = 'planets';
        return $this->render('accueil/index.html.twig', [
            'filtre' => $filtre,
            'filtre_titre' => $titre,
        ]);
    }

    #[Route('/afficher', name: 'app_afficher')]
    public function afficherTout(Request $request): Response
    {
        if ($request->isXmlHttpRequest()) 
        {
            $filtre = $request->request->get('filtre');
            $client = new Client(['base_uri' => self::API_URI]);
            $response = $client->request('GET', $filtre);
            $body = $response->getBody();
            dd($body);
        } else {
            $data = [
                'message' => 'Veuiller passer via les routes de l`\interface',
                'status' => 'success'
            ];
            
            return new JsonResponse($data);
        }
    }//end function affichertout
}
