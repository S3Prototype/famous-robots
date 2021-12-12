export const sendVoteToServer = async (robot, userData) => {
  return await fetch(
    "https://famous-robots-docker-backend.onrender.com//robots/vote",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${userData.accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        robot,
        email: userData.email, //To update the user's "voted" array
      }),
    }
  );
};

export const getAllRobots = async (userData) => {
  return fetch(`/robots/all`, {
    method: `GET`,
    headers: {
      authorization: `Bearer ${userData.accessToken}`,
      "content-type": `application/json`,
    },
  });
};
