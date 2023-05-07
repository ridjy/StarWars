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
    //private $client;

    #[Route('/', name: 'app_accueil')]
    public function index(Request $request): Response
    {
        $filtre = $request->query->get('parametre') ?? 'planets';
        $correspondances = ['Planètes' => 'planets',
            'Vaisseaux' => 'starships',
            'Véhicules' => 'vehicles',
            'Personnages' => 'people',
            'Films' => 'films',
            'Espèces' => 'species',
        ]; 
        $titre = array_search($filtre,$correspondances);
        return $this->render('accueil/index.html.twig', [
            'filtre' => $filtre,
            'filtre_titre' => $titre,
        ]);
    }

    #[Route('/afficher', name: 'app_afficher')]
    public function afficherTout(Request $request): JsonResponse
    {
        if ($request->isXmlHttpRequest()) 
        {
            $filtre = $request->request->get('filtre');
            $page = $request->request->get('pagination') ?? 0;
            $endpoint = ($page!=0) ? $filtre.'/?page='.$page : $filtre;
            //ne pas verifier le certificat pour des tests en local
            $client = new Client([
                'verify' => false,
                'base_uri' => self::API_URI ] );
            $response = $client->request('GET', $endpoint);
            $body = $response->getBody()->getContents();
            return new JsonResponse(json_decode($body));
        } else {
            $data = [
                'message' => 'Veuiller passer via les routes de l`\interface',
                'status' => 'success'
            ];
            
            return new JsonResponse($data);
        }
    }//end function affichertout

    #[Route('/details', name: 'app_details')]
    public function afficherDetail(Request $request): Response
    {
        $endpoint = $request->query->get('endurl');
        $filtre = $request->query->get('parametre') ?? 'planets';
        //ne pas verifier le certificat pour des tests en local
        $client = new Client([
            'verify' => false,
            'base_uri' => self::API_URI ] );
        $response = $client->request('GET', $endpoint);
        $body = $response->getBody()->getContents();
        //création du détail
        $aJSON = json_decode($body,true);//array
        $html = '<p><span><b># : </b>'.substr($aJSON['url'], -2, 1).'</span><br/>';
        $htmlist = '<p>';
        foreach ($aJSON as $key => $value)
        {
            if(is_array($value))
            {
                $htmlist .= '<b>'.$key.'</b><ul>';
                foreach ($value as $uripoint)
                {
                    $a_retour = $this->getNameUri($uripoint);
                    $htmlist .= '<li><b>'.$a_retour['cle'].'</b> : '.$a_retour['valeur'].'</li>';
                }
                $htmlist .= '</ul>';
            } else if(str_contains($value, 'https://swapi.dev/api/')) 
            {
                $a_retour = $this->getNameUri($value);
                $html .= '<span><b>'.$key.'</b> : '.$a_retour['valeur'].'</span><br/>';
            } else if ($key=='created' || $key=='edited')
            {
                $html .= '<span><b>'.$key.'</b> : '.\DateTime::createFromFormat("Y-m-d\TH:i:s.u\Z", $value)->format("Y-m-d H:i:s").'</span><br/>';
            }
            else {
                if ($key!='url')
                    $html .= '<span><b>'.$key.'</b> : '.$value.'</span><br/>';
            }
        }//end foreach
        $html .= '</p>';$htmlist .= '</p>';
        return $this->render('accueil/details.html.twig', [
            'data' => $html,
            'list' => $htmlist,
            'filtre' => $filtre
        ]);
    }//end function affichertout

    private function getNameUri($uripoint) : array
    {
        $endpoint = str_replace('https://swapi.dev/api/','',$uripoint);
        //ne pas verifier le certificat pour des tests en local
        $client = new Client([
            'verify' => false,
            'base_uri' => self::API_URI ] );
        $response = $client->request('GET', $endpoint);
        $body = $response->getBody()->getContents();
        //création du détail
        $aJSON = json_decode($body,true);//array
        foreach ($aJSON as $key => $value)
        {
            $a_res['cle'] = $key;
            $a_res['valeur'] = $value;
            return $a_res;//on arrête la boucle
        }    
    }//end getnameuri
}
