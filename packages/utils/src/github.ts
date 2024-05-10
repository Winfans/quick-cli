// const getGithubInfo = (npmName: string) => {
//   const url = `https://raw.githubusercontent.com/NiXitech/${npmName}/main/package.json`;
//   return axios.get(url).then((res) => {
//     if (res.status === 200) {
//       return res.data;
//     } else {
//       return Promise.reject(res);
//     }
//   });
// };

// const getVersion = async (npmName: string) => {
//   const info = await getGithubInfo(npmName);
//   return info?.version;
// };

// export { getGithubInfo, getVersion };
