import MainPage from "./MainPage";
import Personal from "./Personal";
import UserSuggestions from "./UserSuggestions";

function WebPage() {


    return (
      <div className="mt-10 pr-5 pl-5 ">
        <div className="flex items-center justify-center">
          <div className="grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-10 border-solid">
            <Personal></Personal>
            <MainPage></MainPage>
            <UserSuggestions></UserSuggestions>
          </div>
        </div>
      </div>
    );
}

export default WebPage;
