// import * as Google from "expo-auth-session/providers/google";
// import * as AuthSession from "expo-auth-session";
// export const socialConfig = {
//   google: {
//     api: Google,
//     props: {
//       iosClientId:
//         "531447820917-m57q8q96ht4c98lco22v37ilfitb04ll.apps.googleusercontent.com",
//       expoClientId:
//         "531447820917-kuff6vjtnis0eanbk2c621oa3hlg90p0.apps.googleusercontent.com",
//       androidClientId:
//         "531447820917-mo9r7v1v1l3n8aac1jki228ll6fc378d.apps.googleusercontent.com",
//     },
//     options: { useProxy: false, showInRecents: true },
//   },
// };
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
const clientId =
  '85762318670-h6ihuuohmvolnn9niqrk67cdv8rmk415.apps.googleusercontent.com';
export const socialConfig = {
  google: {
    api: Google,
    props: {
      iosClientId: clientId,
      // "531447820917-m57q8q96ht4c98lco22v37ilfitb04ll.apps.googleusercontent.com",
      expoClientId: clientId,
      // "531447820917-kuff6vjtnis0eanbk2c621oa3hlg90p0.apps.googleusercontent.com",
      androidClientId: clientId,
      // "531447820917-mo9r7v1v1l3n8aac1jki228ll6fc378d.apps.googleusercontent.com",
    },
    options: {useProxy: false, showInRecents: true},
  },
};
