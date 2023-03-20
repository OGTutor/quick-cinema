import { IGalleryItem } from '@/components/ui/gallery/gallery.types';
import { ISlide } from '@/components/ui/slider/slider.types';

export interface IHome {
	slides: ISlide[];
	trendingMovies: IGalleryItem[];
	actors: IGalleryItem[];
}
