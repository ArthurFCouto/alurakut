import { SiteClient } from "datocms-client"

//Todos os dados criados aqui não ficam visíveis ao front, não são exibidos em nenhuma parte no navegador
export default async function comunidadesApi(request, response) {
    if(request.method === 'POST') {
        const token = "feea6da15483fb2658c62a04a012ad";
        const client = new SiteClient(token);
        //Sempre validar os dados antes de cadastrar
        const registroCreate = await client.items.create({
            itemType: "1039563", // model ID do modelo criado pelo dato
            ...request.body,
            //title: "Teste",
            //imagemUrl: "",
            //creatorSlug: "arthurfcouto"
        })
        response.json({
            registroCreate: registroCreate
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
} //Estamos criando este BFF para melhorar a segurança da aplicação.