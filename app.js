const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])



const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'ola'])
    .addAnswer('Hola como estas en que puedo ayudarte soy un asistente *Virtual* ', {
        delay: 100,
        
    })

const flowPrincipa = addKeyword(['qr', 'Qr', 'enviar', 'me puede'])
    .addAnswer('Ahi le envio el *QR* ', {
        delay: 1000,
        media: "https://www.celag.org/wp-content/uploads/2019/04/bolivia-en-la-geopolitica-mundial-1536x864.jpg"  
    })
    
const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("Este es respuesta del flujo", {
        delay: 10,
      }, 
    async(ctx, ctxFn)=>{
        if(ctx.body.includes("casa")){
            await ctxFn.flowDynamic("Escriviste casa")
        }else{
            await ctxFn.flowDynamic("Escribiste otra cosa")
        }
        console.log(ctx.body)
        
    })



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome,flowPrincipa])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
