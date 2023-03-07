import { IMessage } from '@/types';
import moment from 'moment';

interface IProps {
  message: IMessage;
  isUserMessage?: boolean;
}

const Message: React.FC<IProps> = ({ message, isUserMessage = false }) => {
  return (
    <div
      className={`relative w-fit max-w-[85%] rounded-xl px-2.5 py-2 shadow sm:max-w-[65%] ${
        isUserMessage
          ? 'self-end rounded-br bg-green-50 dark:bg-teal-900'
          : 'rounded-bl bg-white dark:bg-gray-800/75'
      }`}
    >
      <p>
        {message.body}&nbsp;
        <span
          aria-hidden
          className="whitespace-nowrap pl-1 text-[11px] leading-none text-transparent"
        >
          {moment(+message.createAt).format('LT')}
        </span>
      </p>
      <time
        className="absolute right-2.5 bottom-1 text-[11px] leading-none text-zinc-500 dark:text-gray-400"
        dateTime={new Date(+message.createAt).toISOString()}
        title={new Date(+message.createAt).toDateString()}
      >
        {moment(+message.createAt).format('LT')}
      </time>
    </div>
  );
};

export default Message;
