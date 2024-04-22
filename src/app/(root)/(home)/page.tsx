import MeetingTypeList from '@/components/meetingTypeList/MeetingTypeList';

const Home = () => {
    const now = new Date();

    const time = now.toLocaleTimeString('chinese', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai',
    });

    const date = new Intl.DateTimeFormat('chinese', {
        dateStyle: 'full',
    }).format(now);

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
                <div className="mb-5 flex h-full flex-col justify-between max-md:px-5 max-lg:p-8 lg:p-11">
                    <h2 className="glassMorphism max-x-[270px] rounded py-2 text-center text-base font-normal">
                        Upcoming Meeting at: 12:30 PM
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                        <p className="text-lg font-medium text-sky-300 lg:text-2xl">{date}</p>
                    </div>
                </div>
                <MeetingTypeList />
            </div>
        </section>
    );
};
export default Home;
