// import {
//     ActionPostResponse,
//     createActionHeaders,
//     createPostResponse,
//     ActionGetResponse,
//     ActionPostRequest,
//   } from "@solana/actions";

//   const headers = createActionHeaders({
//     chainId: "devnet", // or chainId: "devnet"
//     actionVersion: "2.2.1", // the desired spec version
//   });

//   export const GET = async (req: Request) => {
//     const payload: ActionGetResponse = {
//         title: 'Tie your valorant account',
//         icon: 'https://media.assettype.com/afkgaming/import/media/images/13974-fd9b45e17c5887653166de9fbe97437f.jpeg?w=1200&h=675&auto=format%2Ccompress&fit=max',
//         label: 'Donate SOL',
//         description: 'Cybersecurity Enthusiast | Support my research with a donation.',
//         links: {
//          actions: [
//            {
//              href: `/api/donate/{${amountParameterName}}/{${thankYouNote}}`,
//              label: 'Donate',
//              parameters: [
//                {
//                  name: amountParameterName,
//                  label: 'Enter a custom SOL amount',
//                },
//                {
//                  name: thankYouNote,
//                  label: 'Thank you note',
//                },
//              ],
//            },
//          ],
//         },
//      }
  
//     return Response.json(payload, {
//       headers,
//     });
//   }

//   export const OPTIONS = GET;
  

//   export const POST = async (req: Request) => {
//     const body: ActionPostRequest = await req.json(); 
      
//     // insert transaction logic here    
        
//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction,
//         message: "Optional message to include with transaction",
//       },
//     });
    
//     return Response.json(payload, {
//       headers,
//     });
//   };