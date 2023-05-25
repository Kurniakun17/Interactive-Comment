import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading } from "./Loading";
import { useProfilePic } from "../hooks/useProfilePic";

export const ProfileSetup = ({
  onSubmitHandler,
}: {
  onSubmitHandler: (profilePic: string) => void;
}) => {
  const { profilePic, loading, randomizeProfilePic } = useProfilePic();

  if (loading) {
    return <Loading></Loading>;
  }


  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2 className="text-center font-bold text-moderateBlue text-xl">
        Setup Profile Picture 🎉
      </h2>
      <div className="relative">
        <img
          className="text-center w-28 h-28 bg-gray-200 rounded-full "
          src={`data:image/svg+xml;utf8,${encodeURIComponent(profilePic)}`}
          alt=""
        />
        <button
          className="absolute bottom-0 right-0"
          onClick={randomizeProfilePic}
        >
          <FontAwesomeIcon
            className="bg-moderateBlue rounded-full p-1.5 text-white"
            icon={faRefresh}
            size="lg"
          />
        </button>
      </div>
      <button
        className="font-bold text-white text-md pt-1.5 pb-2.5 px-4 rounded-lg w-full bg-moderateBlue"
        onClick={() => {
          onSubmitHandler(profilePic);
        }}
      >
        Yes, I Love It ❤️
      </button>
    </div>
  );
};

const convetrBase64 = (svg: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(svg);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
