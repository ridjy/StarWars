function afficher()
{
    if ($('#tab').is(':visible')) 
    {
        console.log('resultat déjà affiché');
    } else {
        $('#loadingDiv').show();
        var filtre = '{{filtre}}' ;
        var p = 1; 
        $.ajax({
            url: "{{ path('app_afficher') }}",
            type: 'POST',
            data: { filtre: filtre },
            success: function(response) {
                // Masquer le div d'attente
                $('#loadingDiv').hide();
                $('#tab').show();
                // Afficher les résultats
                $('#afficheres').html('Affichage de 10 sur '+response.count+' résultat(s)');
                /*console.log(response.count);
                console.log(response.next);
                console.log(response.previous);*/
                if (response.previous === null) { $('#prec').hide(); }
                else {
                    //valeur prochaine page
                    $('#prec').show();
                    page = response.previous.charAt(response.previous.length - 1); 
                    $('#prec').attr('onclick', 'precedent('+page+')');
                }
                if (response.next === null) { $('#suiv').hide(); }
                else {
                    $('#suiv').show();
                    //valeur prochaine page
                    page = response.next.charAt(response.next.length - 1); 
                    $('#suiv').attr('onclick', 'suivant('+page+')');
                }
                afficheHTML(filtre,response.results,p);
                //$('#results').html(response);
            },
            error: function() {
            // En cas d'erreur, masquer le div d'attente et afficher un message d'erreur
                $('#loadingDiv').hide();
                $('#tab').show();
                $('#tab').html('Une erreur s\'est produite.');
            }
        });
    }
}//fin afficher

function afficheHTML(filtre,results,p)
{
    //array results
    console.log(p);
    let n = 10*(p-1);
    let endpoint = '';
    let url = '';
    switch (filtre) 
    {
        case 'planets':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Nom</th><th>Diamètre</th><th>Climat</th>'
                    +'<th>Gravité</th><th>Population</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].name+'</td>'+'<td>'+results[i].diameter+'</td><td>'+results[i].climate+'</td>'
                +'<td>'+results[i].gravity+'</td>'
                +'<td>'+results[i].population+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            }
            break;
        case 'starships':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Nom</th><th>Modèle</th><th>Fabriquant</th>'
                    +'<th>Longueur</th><th>Equipage</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].name+'</td>'+'<td>'+results[i].model+'</td><td>'+results[i].manufacturer+'</td>'
                +'<td>'+results[i].length+'</td>'
                +'<td>'+results[i].crew+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            
            }
            break;
        case 'vehicles':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Nom</th><th>Modèle</th><th>Fabriquant</th>'
                    +'<th>Longueur</th><th>Equipage</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].name+'</td>'+'<td>'+results[i].model+'</td><td>'+results[i].manufacturer+'</td>'
                +'<td>'+results[i].length+'</td>'
                +'<td>'+results[i].crew+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            
            }
            break;
        case 'people':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Nom</th><th>Longueur</th><th>Poids</th>'
                    +'<th>Couleur de cheveux</th><th>Couleur de peau</th><th>Genre</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].name+'</td>'+'<td>'+results[i].height+'</td><td>'+results[i].mass+'</td>'
                +'<td>'+results[i].hair_color+'</td>'+'<td>'+results[i].skin_color+'</td>'
                +'<td>'+results[i].gender+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            
            }
            break;
        case 'films':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Titre</th><th>Episode</th><th>Situation initiale</th>'
                    +'<th>Directeur</th><th>Producteur</th><th>Date de sortie</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].title+'</td>'+'<td>'+results[i].episode_id+'</td><td>'+results[i].opening_crawl+'</td>'
                +'<td>'+results[i].director+'</td>'+'<td>'+results[i].producer+'</td>'+'<td>'+results[i].release_date+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            
            }
            break;
        case 'species':
            $('#taleaures').html('<thead class="table-light"><tr>'
                    +'<th>#</th><th>Nom</th><th>Classification</th><th>Designation</th>'
                    +'<th>Hauteur moyenne</th><th>language</th><th>Détails</th>'
                    +'</tr></thead><tbody>');   
            for(var i = 0 ; i<10 ; i++)
            {
                n++;
                endpoint = results[i].url.replace('https://swapi.dev/api/','');
                url = '{{ path("app_details", {"endurl": "endpoint" , "parametre" : "filtre"}) }}'; 
                url = url.replace("endpoint", endpoint);url = url.replace("filtre", filtre);
                $('#taleaures').append('<tr><td>'+n+'</td>'
                +'<td>'+results[i].name+'</td>'+'<td>'+results[i].classification+'</td><td>'+
                results[i].classification+'</td>'
                +'<td>'+results[i].average_height+'</td>'+'<td>'+results[i].language+'</td>'
                +'<td style="text-align:center;">'+
                    '<a href="'+url+'"><i class="bi bi-info-circle"></i></a>'+
                '</td></tr>');
            
            }
            break;
        default:
            console.log('Le filtre est inconnu');
            break;
    }
    $('#taleaures').append('</tbody>');
}//fin afficheHTML

function suivant(p)
{
    $('#tab').hide()
    $('#loadingDiv').show();
    var filtre = '{{filtre}}' ; 
    $.ajax({
        url: "{{ path('app_afficher') }}",
        type: 'POST',
        data: { filtre: filtre, pagination : p },
        success: function(response) {
            // Masquer le div d'attente
            $('#loadingDiv').hide();
            $('#tab').show();
            // Afficher les résultats
            $('#afficheres').html('Affichage de 10 sur '+response.count+' résultat(s)');
            /*console.log(response.count);
            console.log(response.next);
            console.log(response.previous);*/
            if (response.previous === null) { $('#prec').hide(); }
            else {
                $('#prec').show();
                //valeur prochaine page
                var page = response.previous.charAt(response.previous.length - 1); 
                $('#prec').attr('onclick', 'precedent('+page+')');
            }
            if (response.next === null) { $('#suiv').hide(); }
            else {
                $('#suiv').show();
                //valeur prochaine page
                var page = response.next.charAt(response.next.length - 1); 
                $('#suiv').attr('onclick', 'suivant('+page+')');
            }
            afficheHTML(filtre,response.results,p);
            //$('#results').html(response);
        },
        error: function() {
        // En cas d'erreur, masquer le div d'attente et afficher un message d'erreur
            $('#loadingDiv').hide();
            $('#tab').show();
            $('#tab').html('Une erreur s\'est produite.');
        }
    });
}//fin suivant

function precedent(p)
{
    $('#tab').hide()
    $('#loadingDiv').show();
    var filtre = '{{filtre}}' ; 
    $.ajax({
        url: "{{ path('app_afficher') }}",
        type: 'POST',
        data: { filtre: filtre, pagination : p },
        success: function(response) {
            // Masquer le div d'attente
            $('#loadingDiv').hide();
            $('#tab').show();
            // Afficher les résultats
            $('#afficheres').html('Affichage de 10 sur '+response.count+' résultat(s)');
            /*console.log(response.count);
            console.log(response.next);
            console.log(response.previous);*/
            if (response.previous === null) { $('#prec').hide(); }
            else {
                $('#prec').show();
                //valeur prochaine page
                var page = response.previous.charAt(response.previous.length - 1); 
                $('#prec').attr('onclick', 'precedent('+page+')');
            }
            if (response.next === null) { $('#suiv').hide(); }
            else {
                $('#suiv').show();
                //valeur prochaine page
                var page = response.next.charAt(response.next.length - 1); 
                $('#suiv').attr('onclick', 'suivant('+page+')');
            }
            afficheHTML(filtre,response.results,p);
            //$('#results').html(response);
        },
        error: function() {
        // En cas d'erreur, masquer le div d'attente et afficher un message d'erreur
            $('#loadingDiv').hide();
            $('#tab').show();
            $('#tab').html('Une erreur s\'est produite.');
        }
    });
}//fin suivant