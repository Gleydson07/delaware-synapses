import Wrapper from "@/components/Wrapper";
import { CardDetails } from "./styles";
import CardProgress from "@/components/CardProgress";
import { onGetColorPhaseStatus } from "@/styles/color";
import { cryptography } from "@/utils/cryptography";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { findFeaturesByFaseIdAndProjectId } from "@/api/feature";
import Users from "./Users";
import { IconFeatureStatus } from "@/assets/iconsTSX/icons";
interface FeatureProps {
  token: any;
  currentEpic: any;
}

export default function Feature({ token, currentEpic }: FeatureProps) {
  const [features, setFeatures] = useState<any>();
  const decript = cryptography.decrypt(token);

  const fetchData = async () => {
    const responseFeatures = await findFeaturesByFaseIdAndProjectId(
      currentEpic.epicId,
      decript.uuid
    );

    setFeatures(responseFeatures);
  };

  useEffect(() => {
    if (currentEpic) {
      fetchData();
    }
  }, [currentEpic]);

  return (
    <Wrapper>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {features?.map((feature: any) => (
          <SwiperSlide key={feature.featureId}>
            <CardDetails key={feature.almId}>
              <CardProgress
                completeWork={feature.completeWork}
                workTitle={feature.title}
                percentComplete={feature.percentComplete}
                name={feature.status.id}
                totalWork={feature.totalWork}
                icon={IconFeatureStatus(
                  onGetColorPhaseStatus(feature.status.id).secondary
                )}
                isFeatureCard={true}
              />
              <Users featureId={feature.featureId} decrypted={decript} />
            </CardDetails>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}
