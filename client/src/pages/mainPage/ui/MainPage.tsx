import classNames from "classnames";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { ConferenceCard } from "widgets/conferenceCard";
import cls from "./MainPage.m.scss";

export const MainPage = () => {
	const conferences = useAppSelector(state => state.conferencesState.conferences);
	return (
		<div className={classNames(cls.root)}>
			<div className={classNames(cls["cards-list"])}>
				{conferences.map(conference => (
					<ConferenceCard
						key={conference.id}
						conference={conference}
					/>
				))}
			</div>
		</div>
	);
};
