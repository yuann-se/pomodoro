import { FC } from "react";

export const MenuIcon: FC = () => {
  return (
    <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
      <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
      <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
    </svg>
  )
};

export const IncreaseIcon: FC = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.75 5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75H12.75V8.25H9.75V5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z" fill="#A8B64F" />
    </svg>
  )
};

export const DecreaseIcon: FC = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z" fill="#A8B64F" />
      <path d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z" fill="#A8B64F" />
    </svg>
  )
};

export const EditIcon: FC = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z" fill="#A8B64F" />
    </svg>
  )
};

export const DeleteIcon: FC = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z" fill="#A8B64F" />
    </svg>
  )
};

export const MarkDoneIcon: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
      <path fill="#A8B64F" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" id="mainIconPathAttribute"></path>
      <path fill="#A8B64F" d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" id="mainIconPathAttribute"></path>
    </svg>
  )
};

export const CloseIcon: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
    </svg>
  )
};

export const StatsIcon: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 16H10V0H6V16ZM0 16H4V8H0V16ZM12 5V16H16V5H12Z" fill="#DC3E22" />
    </svg>
  )
};

export const SelectArrow: FC = () => {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
    </svg>
  )
};

export const PomodoroIcon: FC = () => {
  return (
    <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_566)">
        <path d="M78.8031 47.4453C78.8031 68.5505 61.6937 81.2964 40.5884 81.2964C19.4825 81.2964 2.37305 64.187 2.37305 43.0811C2.37305 21.9758 20.017 9.00003 41.1223 9.00003C62.2283 9.00003 78.8031 26.3393 78.8031 47.4453Z" fill="#DC3E22" />
        <path d="M57.1821 25.5283C55.3254 23.6378 52.3214 21.8798 50.0845 21.3658C51.3138 20.2757 51.5612 20.2398 53.1011 19.4768C57.0471 17.5237 62.8917 17.3438 62.8917 17.3438C62.8917 17.3438 55.9932 13.7785 50.9492 14.0022C49.6651 14.0587 48.3107 14.5124 47.004 15.1552C47.7408 14.1154 48.439 13.0815 48.8853 12.3048C50.2508 9.92997 51.6862 6.93822 51.6862 6.93822C51.6862 6.93822 46.3974 7.22062 43.9441 10.1567C43.0125 11.2721 42.3092 12.6892 41.7945 14.0186C40.8804 12.9685 39.8715 12.0334 38.8625 11.3035C33.8174 7.65241 25.7565 8.4423 25.7565 8.4423C25.7565 8.4423 31.8459 11.8966 34.5857 15.3425C35.6554 16.6882 36.7411 17.3106 37.3901 18.8194C35.1468 18.3337 30.0853 18.4997 27.6007 19.4209C21.2162 21.7888 18.4651 31.3165 18.4651 31.3165C18.4651 31.3165 24.6953 27.0221 33.1722 24.0095C35.036 23.3473 37.0065 23.1718 38.7239 23.202C37.9443 24.4165 37.0926 25.9936 36.4481 27.8531C34.88 32.3805 36.9521 43.1555 36.9521 43.1555C36.9521 43.1555 41.4915 36.7834 43.3412 31.6218C44.2905 28.9723 44.5255 26.3121 44.5307 24.3491C46.2141 25.0961 48.1968 26.1872 49.6786 27.131C57.2658 31.9651 60.8959 40.7907 60.8959 40.7907C60.8959 40.7907 61.9531 30.3871 57.1821 25.5283Z" fill="#899441" />
        <path d="M41.5144 20.8766C41.4903 20.8766 41.4662 20.876 41.4421 20.8754C39.9416 20.8365 38.757 19.5894 38.7934 18.0902C38.7965 17.9604 38.9275 8.83157 33.8564 4.86227C32.6735 3.93653 32.4647 2.2272 33.3904 1.04376C34.3168 -0.139053 36.0261 -0.347931 37.2089 0.578423C44.4609 6.25335 44.2446 17.7416 44.2323 18.228C44.1933 19.705 42.9833 20.8766 41.5144 20.8766Z" fill="#A8B64F" />
      </g>
      <defs>
        <clipPath id="clip0_16_566">
          <rect width="81" height="81" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
};

export const NoDataPomodoroIcon: FC = () => {
  return (
    <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_527)">
        <path d="M111.881 66.9398C111.881 96.9041 87.5898 115 57.6255 115C27.6603 115 3.36914 90.7089 3.36914 60.7437C3.36914 30.7794 28.4192 12.3571 58.3836 12.3571C88.3488 12.3571 111.881 36.9746 111.881 66.9398Z" fill="#DC3E22" />
        <path d="M81.185 36.2439C78.5489 33.5598 74.284 31.0639 71.1081 30.3341C72.8534 28.7865 73.2046 28.7355 75.391 27.6522C80.9932 24.8793 89.2913 24.624 89.2913 24.624C89.2913 24.624 79.497 19.5621 72.3358 19.8797C70.5127 19.9599 68.5898 20.604 66.7346 21.5166C67.7807 20.0403 68.7719 18.5725 69.4056 17.4698C71.3442 14.0981 73.3822 9.85057 73.3822 9.85057C73.3822 9.85057 65.8733 10.2515 62.3903 14.42C61.0676 16.0036 60.0691 18.0155 59.3384 19.9029C58.0406 18.4121 56.6082 17.0845 55.1756 16.0481C48.0129 10.8645 36.5683 11.986 36.5683 11.986C36.5683 11.986 45.2138 16.8902 49.1036 21.7826C50.6224 23.6932 52.1638 24.5767 53.0852 26.7189C49.9003 26.0293 42.7142 26.265 39.1867 27.5729C30.1222 30.9348 26.2164 44.4617 26.2164 44.4617C26.2164 44.4617 35.0618 38.3648 47.0968 34.0876C49.743 33.1475 52.5406 32.8983 54.9789 32.9411C53.872 34.6654 52.6628 36.9045 51.7478 39.5446C49.5215 45.9724 52.4634 61.2701 52.4634 61.2701C52.4634 61.2701 58.9082 52.2234 61.5343 44.8951C62.8821 41.1335 63.2157 37.3568 63.2231 34.5698C65.6131 35.6302 68.4281 37.1793 70.5319 38.5193C81.3038 45.3826 86.4576 57.9127 86.4576 57.9127C86.4576 57.9127 87.9585 43.1422 81.185 36.2439Z" fill="#899441" />
        <path d="M58.9395 29.6396C58.9053 29.6396 58.8711 29.6388 58.8368 29.6379C56.7066 29.5826 55.0246 27.8121 55.0764 25.6835C55.0808 25.4993 55.2668 12.5386 48.067 6.90318C46.3877 5.58886 46.0911 3.16203 47.4054 1.48184C48.7206 -0.197465 51.1475 -0.49402 52.8268 0.821175C63.1229 8.87817 62.8158 25.1887 62.7982 25.8792C62.7429 27.9761 61.025 29.6396 58.9395 29.6396Z" fill="#A8B64F" />
        <circle cx="41.5" cy="64.5" r="2.5" fill="black" />
        <g filter="url(#filter0_f_16_527)">
          <circle cx="29.5" cy="75.5" r="5.5" fill="#EA8979" />
        </g>
        <g filter="url(#filter1_f_16_527)">
          <circle cx="85.5" cy="75.5" r="5.5" fill="#EA8979" />
        </g>
        <circle cx="73.5" cy="64.5" r="2.5" fill="black" />
        <path d="M46 78C50 82 64.5 83 68.5 78" stroke="black" />
      </g>
      <defs>
        <filter id="filter0_f_16_527" x="20" y="66" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_16_527" />
        </filter>
        <filter id="filter1_f_16_527" x="76" y="66" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_16_527" />
        </filter>
        <clipPath id="clip0_16_527">
          <rect width="115" height="115" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
};

export const FocusIcon: FC = () => {
  return (
    <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C36.7893 20 20 36.7893 20 57.5C20 78.2107 36.7893 95 57.5 95Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57.5 78C68.8218 78 78 68.8218 78 57.5C78 46.1782 68.8218 37 57.5 37C46.1782 37 37 46.1782 37 57.5C37 68.8218 46.1782 78 57.5 78Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const PauseTimeIcon: FC = () => {
  return (
    <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57.3154 30.1579V57.3158L70.8944 70.8947" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const StopsCountIcon: FC = () => {
  return (
    <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#7FC2D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 20L95 94" stroke="#7FC2D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};
