import { useEffect } from "react";
import HotCategories from "../../../components/HotCategories";
import UnfinishedStory from "../../../components/UnfinishedStory";
import StoryStore from "../../../stores/StoryStore";
const Section1 = () => {
  const { categories, getCategories } = StoryStore;

  useEffect(() => {
    // const checkLogin = async() => {
    //   try {
    //     await GlobalStore.checkIsLogin();
    //   } catch(e) {}
    // }

    // checkLogin();
    // getCategories();
    getCategories();
  }, []);

  return (
    <div className="px-2 sm:grid sm:grid-flow-col sm:grid-cols-12 gap-x-4">
      <UnfinishedStory
        items={[
          {
            totalReadingStory: 10,
            unfinishedStory: {
              completedPercent: 12,
              name: "Y Phi Tái SinhY Phi Tái SinhY Phi Tái SinhY Phi Tái SinhY Phi Tái Sinh ",
              thumbnail:
                "https://lh3.googleusercontent.com/pw/AP1GczOOLanAR0xqw5J0r_brX0bEKtbFV_vnrYtB98DJi6VU0AZkmpMzzT0TtjtjOL1_V8ltGPxg8Umi3aQzmUpyvpx_Bv-AHQ_wKF6mB9v1_EVHnRjFafUV0XkP9hvGFAcOj69pBOV2mR7DaRSVUm-h91Z9=w215-h322-s-no-gm?authuser=4",
              unfinishedChapter: 10,
            },
          },
        ]}
      />
      <div className="sm:order-1 sm:col-span-7 md:col-span-8">
        <HotCategories data={categories} />
      </div>
    </div>
  );
};

export default Section1;
