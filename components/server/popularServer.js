import { Button } from "@mui/material";

export const PopularServer = ({ allServer }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {allServer.map((server, index) => (
        <div
          key={index}
          className="w-full bg-gray-200 shadow-lg rounded-lg p-3 flex flex-col justify-between"
        >
          <img
            src={server.imageUrl}
            alt="Server Background"
            className="w-full h-40 object-fill rounded-md mb-4"
          />

          <div className="text-center">
            <p className="text-xl font-semibold mb-2 text-black">
              {server.name}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Created by :{" "}
              <span className="text-[#28e1bf]  font-semibold">
                {server.members.map((member) => {
                  if (member.role === "ADMIN") {
                    return member.profile.name;
                  }
                })}
              </span>
            </p>
          </div>

          <Button
            variant="contained"
            className="!bg-[#28e1bf]"
            href={`/invite/${server.inviteCode}`}
          >
            Join Server
          </Button>
        </div>
      ))}
    </div>
  );
};
