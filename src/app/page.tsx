import BrowseCategories from '@/components/home/BrowseCategories';
import FeaturedStudios from '@/components/home/FeaturedStudios';
import HeroSlider from '@/components/home/HeroSlider';
import HostGuarantee from '@/components/home/HostGuarantee';
import HowBookingWorks from '@/components/home/HowBookingWorks';

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedStudios />
      <BrowseCategories />
      <HowBookingWorks />
      <HostGuarantee />
    </div>
  );
};

export default HomePage;
