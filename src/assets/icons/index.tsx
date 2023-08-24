import { SVGAttributes } from 'react';


export const QuestionCircle = (props: SVGAttributes<SVGElement>) => {
  const { width = 14, height = 14, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_662_955)">
        <path
          d="M6.99902 0C3.1334 0 -0.000976562 3.13437 -0.000976562 7C-0.000976562 10.8656 3.1334 14 6.99902 14C10.8646 14 13.999 10.8656 13.999 7C13.999 3.13437 10.8646 0 6.99902 0ZM6.99902 12.8125C3.78965 12.8125 1.18652 10.2094 1.18652 7C1.18652 3.79063 3.78965 1.1875 6.99902 1.1875C10.2084 1.1875 12.8115 3.79063 12.8115 7C12.8115 10.2094 10.2084 12.8125 6.99902 12.8125Z"
          fill="black"
          fill-opacity="0.85"
        />
        <path
          d="M8.74253 3.94795C8.27378 3.53701 7.65503 3.31201 6.99878 3.31201C6.34253 3.31201 5.72378 3.53857 5.25503 3.94795C4.76753 4.37451 4.49878 4.94795 4.49878 5.56201V5.68076C4.49878 5.74951 4.55503 5.80576 4.62378 5.80576H5.37378C5.44253 5.80576 5.49878 5.74951 5.49878 5.68076V5.56201C5.49878 4.87295 6.17222 4.31201 6.99878 4.31201C7.82534 4.31201 8.49878 4.87295 8.49878 5.56201C8.49878 6.04795 8.15503 6.49326 7.62222 6.69795C7.29097 6.82451 7.00972 7.04639 6.80815 7.33701C6.60347 7.63389 6.49722 7.99014 6.49722 8.35107V8.68701C6.49722 8.75576 6.55347 8.81201 6.62222 8.81201H7.37222C7.44097 8.81201 7.49722 8.75576 7.49722 8.68701V8.33232C7.49803 8.18064 7.54452 8.03272 7.63065 7.90785C7.71677 7.78298 7.83853 7.68697 7.98003 7.63232C8.90191 7.27764 9.49722 6.46514 9.49722 5.56201C9.49878 4.94795 9.23003 4.37451 8.74253 3.94795ZM6.37378 10.437C6.37378 10.6028 6.43963 10.7617 6.55684 10.879C6.67405 10.9962 6.83302 11.062 6.99878 11.062C7.16454 11.062 7.32351 10.9962 7.44072 10.879C7.55793 10.7617 7.62378 10.6028 7.62378 10.437C7.62378 10.2713 7.55793 10.1123 7.44072 9.99507C7.32351 9.87786 7.16454 9.81201 6.99878 9.81201C6.83302 9.81201 6.67405 9.87786 6.55684 9.99507C6.43963 10.1123 6.37378 10.2713 6.37378 10.437Z"
          fill="black"
          fill-opacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="clip0_662_955">
          <rect width="14" height="14" fill="white" transform="translate(-0.000976562)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EmailIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 92, height = 92, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 92 92" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M47.8982 52.1179C44.4614 52.1016 41.047 51.5629 37.7721 50.5201C35.2018 49.6602 32.9056 48.1337 31.118 46.0964C29.3304 44.059 28.1153 41.5839 27.5969 38.9235C26.4423 33.3637 28.5476 27.4849 33.3684 22.7929C33.8863 22.2888 34.4244 21.8059 34.9814 21.3454C37.4132 19.3094 40.3039 17.8958 43.4041 17.2266C46.5043 16.5574 49.7207 16.6528 52.7758 17.5044C55.7057 18.44 58.2743 20.2594 60.1291 22.7129C61.9838 25.1664 63.0338 28.1338 63.135 31.2078C63.3598 34.8338 62.1779 38.4069 59.8352 41.1837C58.949 42.2998 57.7724 43.1502 56.4345 43.6414C55.0966 44.1326 53.6493 44.2457 52.2514 43.9682C51.6745 43.8485 51.1278 43.6136 50.6438 43.2777C50.1598 42.9418 49.7486 42.5117 49.4346 42.0132C49.1529 41.5289 48.9719 40.9928 48.9023 40.4368C48.8328 39.8809 48.8761 39.3166 49.0298 38.7779C50.3715 33.7087 51.7346 26.0052 51.7484 25.9285C51.7835 25.7302 51.8572 25.5407 51.9655 25.3709C52.0738 25.201 52.2144 25.0542 52.3795 24.9387C52.5445 24.8233 52.7306 24.7414 52.9273 24.6979C53.1239 24.6543 53.3272 24.65 53.5256 24.685C53.7239 24.7201 53.9134 24.7938 54.0833 24.9021C54.2531 25.0104 54.3999 25.151 54.5154 25.316C54.6309 25.4811 54.7127 25.6672 54.7562 25.8639C54.7998 26.0605 54.8042 26.2638 54.7691 26.4621C54.7124 26.7826 53.3692 34.3695 51.9953 39.5614C51.9469 39.7039 51.9281 39.8547 51.9399 40.0048C51.9518 40.1548 51.9941 40.3008 52.0643 40.4339C52.2765 40.727 52.5963 40.9239 52.9536 40.9813C53.8097 41.1242 54.6885 41.0305 55.4952 40.7103C56.3019 40.39 57.0057 39.8554 57.5306 39.1643C59.3499 36.9879 60.2614 34.1947 60.076 31.3642C60.0028 28.9171 59.1742 26.5527 57.7038 24.5953C56.2334 22.6379 54.1933 21.1834 51.8634 20.4315C49.2967 19.7255 46.5967 19.6546 43.9964 20.2249C41.3961 20.7953 38.9736 21.9897 36.938 23.7052C36.4458 24.1146 35.9658 24.5424 35.5058 24.9901C33.123 27.3085 29.3158 32.1201 30.5992 38.2995C31.0229 40.421 31.9935 42.395 33.4149 44.0259C34.8363 45.6568 36.6591 46.888 38.7028 47.5976C45.8942 49.8915 56.2288 50.169 61.6722 43.3993C61.93 43.0926 62.2977 42.899 62.6965 42.86C63.0953 42.821 63.4935 42.9396 63.806 43.1905C64.1184 43.4414 64.3202 43.8047 64.3682 44.2025C64.4161 44.6003 64.3065 45.0011 64.0626 45.3191C60.0361 50.3269 53.9089 52.1179 47.8982 52.1179Z"
        fill="#020D3D"
      />
      <path
        d="M42.6495 44.1678C41.0285 44.1961 39.4473 43.6649 38.1722 42.6636C35.2297 40.3084 35.1485 36.2159 35.9734 33.4299C36.2525 32.5022 36.6251 31.6052 37.0881 30.7542C38.2386 28.4328 40.0781 26.5237 42.3551 25.2879C43.7362 24.5715 45.3111 24.3183 46.8471 24.5657C48.3831 24.8131 49.7988 25.5479 50.8851 26.6617C51.9916 27.8743 52.825 29.3101 53.3292 30.8723C53.456 31.253 53.4284 31.6682 53.2525 32.0289C53.0766 32.3896 52.7663 32.6669 52.3882 32.8013C52.0101 32.9358 51.5944 32.9167 51.2302 32.7481C50.8661 32.5795 50.5825 32.2749 50.4404 31.8996C50.0768 30.7459 49.4727 29.6823 48.6679 28.7793C48.0351 28.132 47.2082 27.7093 46.3129 27.5756C45.4177 27.4419 44.5033 27.6045 43.7091 28.0387C42.0014 29.0018 40.6291 30.464 39.7761 32.2293C39.4178 32.8909 39.1286 33.5876 38.9128 34.3085C38.3163 36.3233 38.4482 38.9545 40.0919 40.2701C41.889 41.7145 44.9219 41.1042 46.6285 39.6322C47.8997 38.4871 48.9919 37.1577 49.8685 35.6885C49.9747 35.5173 50.1136 35.3687 50.2772 35.2513C50.4408 35.1338 50.626 35.0497 50.8222 35.0038C51.0183 34.9578 51.2215 34.951 51.4203 34.9836C51.6191 35.0163 51.8095 35.0877 51.9806 35.194C52.1518 35.3002 52.3004 35.4391 52.4178 35.6027C52.5353 35.7663 52.6194 35.9515 52.6653 36.1476C52.7113 36.3438 52.7181 36.547 52.6855 36.7458C52.6528 36.9446 52.5814 37.135 52.4751 37.3061C51.4358 39.037 50.142 40.6016 48.6372 41.9475C46.9607 43.3622 44.8431 44.1474 42.6495 44.1678Z"
        fill="#020D3D"
      />
      <path
        d="M87.4 92H4.6C3.38038 91.9988 2.21106 91.5138 1.34865 90.6514C0.486251 89.789 0.0012181 88.6196 2.99841e-07 87.4V30.6667C-0.000181953 30.3752 0.0827233 30.0897 0.239 29.8437C0.395276 29.5976 0.618448 29.4012 0.882361 29.2774C1.14627 29.1537 1.43999 29.1077 1.72909 29.1449C2.01819 29.1822 2.2907 29.301 2.51467 29.4876L40.1365 60.7553C41.7868 62.1189 43.8607 62.8649 46.0015 62.8649C48.1423 62.8649 50.2162 62.1189 51.8665 60.7553L89.4853 29.486C89.7094 29.2994 89.982 29.1805 90.2713 29.1434C90.5605 29.1062 90.8544 29.1523 91.1183 29.2762C91.3823 29.4002 91.6055 29.5968 91.7616 29.8431C91.9178 30.0894 92.0005 30.3751 92 30.6667V87.4C91.9988 88.6196 91.5137 89.789 90.6513 90.6514C89.7889 91.5138 88.6196 91.9988 87.4 92ZM3.06667 33.9342V87.4C3.06667 88.2464 3.7536 88.9334 4.6 88.9334H87.4C87.8067 88.9334 88.1967 88.7718 88.4842 88.4843C88.7718 88.1967 88.9333 87.8067 88.9333 87.4V33.9342L53.8231 63.1136C51.6222 64.9324 48.8565 65.9277 46.0013 65.9282C43.1462 65.9288 40.38 64.9346 38.1785 63.1166L3.06667 33.9342Z"
        fill="#020D3D"
      />
      <path
        d="M1.53486 32.2C1.20923 32.2007 0.891847 32.0976 0.628698 31.9058C0.365548 31.714 0.170295 31.4434 0.0712235 31.1332C-0.0278481 30.823 -0.0255932 30.4893 0.0776616 30.1805C0.180916 29.8717 0.379809 29.6037 0.645526 29.4155L14.4455 19.6328C14.7774 19.3976 15.1891 19.3038 15.5901 19.3721C15.9911 19.4404 16.3485 19.6651 16.5838 19.997C16.819 20.3288 16.9128 20.7405 16.8445 21.1415C16.7762 21.5425 16.5514 21.9 16.2196 22.1352L2.41959 31.9179C2.16121 32.1017 1.85194 32.2003 1.53486 32.2ZM90.4651 32.2C90.148 32.2003 89.8388 32.1017 89.5804 31.9179L75.7804 22.1352C75.452 21.8988 75.2304 21.5422 75.1639 21.1431C75.0974 20.744 75.1912 20.3348 75.4251 20.0046C75.659 19.6744 76.0139 19.4501 76.4124 19.3804C76.811 19.3108 77.2209 19.4015 77.5529 19.6328L91.3529 29.4155C91.6184 29.6036 91.8172 29.8712 91.9205 30.1798C92.0239 30.4883 92.0264 30.8217 91.9277 31.1317C91.829 31.4418 91.6343 31.7124 91.3716 31.9044C91.109 32.0965 90.7905 32.2 90.4651 32.2ZM60.168 10.7334C59.8504 10.7336 59.5407 10.635 59.2817 10.4512L51.9524 5.25322C50.3038 3.85978 48.2184 3.08928 46.0598 3.07611C43.9013 3.06294 41.8066 3.80793 40.1411 5.18115L32.7198 10.4512C32.388 10.6865 31.9762 10.7803 31.5753 10.712C31.1743 10.6437 30.8168 10.4189 30.5816 10.0871C30.3463 9.75522 30.2525 9.34351 30.3208 8.94252C30.3891 8.54152 30.6139 8.18408 30.9457 7.94882L38.2751 2.75082C40.4708 0.955397 43.2231 -0.0195808 46.0594 -0.00671012C48.8957 0.00616059 51.6391 1.00608 53.8185 2.82135L61.0558 7.94882C61.3215 8.13705 61.5204 8.40499 61.6237 8.71382C61.7269 9.02265 61.7292 9.35633 61.6301 9.66653C61.531 9.97673 61.3358 10.2473 61.0726 10.4391C60.8095 10.6309 60.4921 10.734 60.1665 10.7334H60.168ZM2.52999 91.172C2.21426 91.1726 1.90603 91.0758 1.64741 90.8947C1.38879 90.7135 1.19239 90.457 1.08502 90.1601C0.977663 89.8632 0.96458 89.5403 1.04756 89.2357C1.13054 88.9311 1.30554 88.6595 1.54866 88.458L36.5393 59.386C36.6943 59.2574 36.873 59.1605 37.0654 59.1009C37.2578 59.0413 37.4601 59.0202 37.6606 59.0388C37.8612 59.0574 38.0561 59.1153 38.2343 59.2092C38.4124 59.3031 38.5704 59.4312 38.699 59.5861C38.8277 59.7411 38.9246 59.9198 38.9842 60.1122C39.0437 60.3046 39.0648 60.5069 39.0463 60.7074C39.0277 60.908 38.9698 61.1029 38.8759 61.2811C38.782 61.4592 38.6539 61.6172 38.4989 61.7458L3.50826 90.8178C3.23361 91.0466 2.88746 91.172 2.52999 91.172ZM89.4685 91.172C89.1109 91.1724 88.7646 91.047 88.4902 90.8178L53.4995 61.7458C53.3406 61.6185 53.2086 61.4607 53.1113 61.2818C53.014 61.1029 52.9533 60.9064 52.9328 60.7038C52.9122 60.5012 52.9323 60.2965 52.9917 60.1017C53.0512 59.9069 53.1488 59.7259 53.279 59.5693C53.4091 59.4126 53.5692 59.2835 53.7498 59.1894C53.9304 59.0953 54.128 59.0381 54.3309 59.0212C54.5339 59.0043 54.7382 59.028 54.9319 59.0909C55.1256 59.1538 55.3048 59.2546 55.4591 59.3876L90.4498 88.4596C90.6929 88.661 90.8679 88.9326 90.9509 89.2372C91.0339 89.5419 91.0208 89.8647 90.9134 90.1616C90.8061 90.4585 90.6097 90.7151 90.351 90.8962C90.0924 91.0773 89.7842 91.1726 89.4685 91.172Z"
        fill="#020D3D"
      />
      <path
        d="M76.6667 43.6694C76.2601 43.6694 75.87 43.5079 75.5825 43.2203C75.2949 42.9327 75.1334 42.5427 75.1334 42.1361V10.7457C75.1288 10.7763 75.0675 10.7334 74.9647 10.7334H17.0354C17.0018 10.7314 16.9683 10.7362 16.9366 10.7475C16.905 10.7588 16.876 10.7765 16.8514 10.7993L16.8667 42.1361C16.8667 42.5427 16.7052 42.9327 16.4176 43.2203C16.1301 43.5079 15.74 43.6694 15.3334 43.6694C14.9267 43.6694 14.5367 43.5079 14.2492 43.2203C13.9616 42.9327 13.8 42.5427 13.8 42.1361V10.7334C13.8241 9.89828 14.1781 9.10672 14.7844 8.53197C15.3908 7.95722 16.2002 7.64611 17.0354 7.66674H74.9647C75.7999 7.64611 76.6093 7.95722 77.2157 8.53197C77.822 9.10672 78.176 9.89828 78.2001 10.7334V42.1361C78.2001 42.5427 78.0385 42.9327 77.7509 43.2203C77.4634 43.5079 77.0734 43.6694 76.6667 43.6694Z"
        fill="#020D3D"
      />
    </svg>
  );
};

export const GoogleIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_42_22179)">
        <path
          d="M23.7663 12.2765C23.7663 11.4608 23.7001 10.6406 23.559 9.83813H12.2402V14.4591H18.722C18.453 15.9495 17.5888 17.2679 16.3233 18.1056V21.104H20.1903C22.4611 19.014 23.7663 15.9274 23.7663 12.2765Z"
          fill="#4285F4"
        />
        <path
          d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
          fill="#34A853"
        />
        <path
          d="M5.50277 14.3002C5.00011 12.8099 5.00011 11.196 5.50277 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3002Z"
          fill="#FBBC04"
        />
        <path
          d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_42_22179">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DashboardIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z"
        fill="#B8C9FF"
      />
      <path
        opacity="0.4"
        d="M18.67 2H16.77C14.59 2 13.44 3.15 13.44 5.33V7.23C13.44 9.41 14.59 10.56 16.77 10.56H18.67C20.85 10.56 22 9.41 22 7.23V5.33C22 3.15 20.85 2 18.67 2Z"
        fill="#B8C9FF"
      />
      <path
        d="M18.67 13.4301H16.77C14.59 13.4301 13.44 14.5801 13.44 16.7601V18.6601C13.44 20.8401 14.59 21.9901 16.77 21.9901H18.67C20.85 21.9901 22 20.8401 22 18.6601V16.7601C22 14.5801 20.85 13.4301 18.67 13.4301Z"
        fill="#B8C9FF"
      />
      <path
        opacity="0.4"
        d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z"
        fill="#B8C9FF"
      />
    </svg>
  );
};

export const SettingsIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.4"
        d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.33 19.7001 5.02 18.5301 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
        fill="#B8C9FF"
      />
      <path
        d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z"
        fill="#B8C9FF"
      />
    </svg>
  );
};

export const WorkspaceIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.4"
        d="M16.19 2H7.82001C4.18001 2 2.01001 4.17 2.01001 7.81V16.18C2.01001 19.82 4.18001 21.99 7.82001 21.99H16.19C19.83 21.99 22 19.82 22 16.18V7.81C22 4.17 19.83 2 16.19 2Z"
        fill="#B8C9FF"
      />
      <path
        d="M22 10.16H14.33C14.32 10.09 14.32 10.01 14.3 9.94004C14.09 9.14004 13.44 8.49004 12.64 8.28004C11.2 7.90004 9.89001 8.84004 9.67001 10.16H2V11.66H9.91C10.11 12.04 10.39 12.36 10.75 12.58V14.56C10.75 15.25 11.31 15.81 12 15.81C12.69 15.81 13.25 15.25 13.25 14.56V12.58C13.61 12.36 13.89 12.04 14.09 11.66H22V10.16Z"
        fill="#B8C9FF"
      />
    </svg>
  );
};

export const PlusIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_620_2497)">
        <rect width="24" height="24" rx="4" fill="#3866FF" />
        <path
          d="M12.913 5.91304C12.913 5.67089 12.8168 5.43865 12.6456 5.26742C12.4744 5.0962 12.2422 5 12 5C11.7578 5 11.5256 5.0962 11.3544 5.26742C11.1832 5.43865 11.087 5.67089 11.087 5.91304V11.087H5.91304C5.67089 11.087 5.43865 11.1832 5.26742 11.3544C5.0962 11.5256 5 11.7578 5 12C5 12.2422 5.0962 12.4744 5.26742 12.6456C5.43865 12.8168 5.67089 12.913 5.91304 12.913H11.087V18.087C11.087 18.3291 11.1832 18.5613 11.3544 18.7326C11.5256 18.9038 11.7578 19 12 19C12.2422 19 12.4744 18.9038 12.6456 18.7326C12.8168 18.5613 12.913 18.3291 12.913 18.087V12.913H18.087C18.3291 12.913 18.5613 12.8168 18.7326 12.6456C18.9038 12.4744 19 12.2422 19 12C19 11.7578 18.9038 11.5256 18.7326 11.3544C18.5613 11.1832 18.3291 11.087 18.087 11.087H12.913V5.91304Z"
          fill="#FEFEFE"
        />
      </g>
      <defs>
        <clipPath id="clip0_620_2497">
          <rect width="24" height="24" rx="4" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ExpandIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 15, height = 9, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 15 9" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.7071 1.20708C14.3166 0.816553 13.6834 0.816553 13.2929 1.20708L7.5 6.99997L1.70711 1.20708C1.31658 0.816551 0.683417 0.816551 0.292893 1.20708C-0.0976316 1.5976 -0.0976317 2.23076 0.292893 2.62129L6.08578 8.41418C6.86683 9.19523 8.13316 9.19523 8.91421 8.41418L14.7071 2.62129C15.0976 2.23077 15.0976 1.5976 14.7071 1.20708Z"
        fill="#B8C9FF"
      />
    </svg>
  );
};

export const LogoIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 106, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 106 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.25 9.23578H9.27888L7.875 18.3845C7.75272 19.1178 7.45686 19.8111 7.01208 20.4067C6.56731 21.0024 5.98654 21.483 5.31823 21.8085L0.823364 24L2.73909 12.1976C2.8814 11.3693 3.31171 10.6179 3.95408 10.076C4.59645 9.5341 5.40959 9.23653 6.25 9.23578Z"
        fill="#FFA800"
      />
      <path
        d="M0 0L2.23625 4.11967C2.53994 4.68057 2.9896 5.14894 3.53765 5.47524C4.0857 5.80153 4.71176 5.97361 5.3496 5.97327H18.2701C18.4731 5.9734 18.6735 6.01799 18.8574 6.10392C19.0413 6.18985 19.2041 6.31503 19.3343 6.47065C19.4646 6.62627 19.5592 6.80854 19.6114 7.00465C19.6637 7.20076 19.6723 7.40593 19.6367 7.60574L19.3435 9.23571H16.5855C15.8469 9.23545 15.1318 9.49528 14.5657 9.96963C13.9996 10.444 13.6186 11.1025 13.4895 11.8298L12.7267 16.1209H15.9146C15.9146 16.1209 23.098 17.3806 25.0882 9.72768C26.4151 4.63649 23.4682 1.52811 22.2159 0.824929C21.1833 0.2954 20.0418 0.012999 18.8814 0H0Z"
        fill="#3866FF"
      />
      <path
        d="M41.6589 18.4947C41.3348 18.7282 40.9687 18.897 40.5805 18.9916C40.1399 19.1004 39.6877 19.1547 39.2338 19.1531C38.0114 19.1531 37.0655 18.8409 36.3963 18.2164C35.7271 17.5919 35.3958 16.675 35.4024 15.4658V11.2418H33.8171V8.94837H35.4024V6.44128H38.3841V8.94837H40.9433V11.2418H38.3841V15.4086C38.3626 15.7705 38.4819 16.1266 38.717 16.4025C38.8413 16.5244 38.9898 16.6187 39.1529 16.6795C39.3159 16.7403 39.49 16.7661 39.6637 16.7554C40.0964 16.7679 40.5204 16.633 40.8663 16.3727L41.6589 18.4947Z"
        fill="#00156A"
      />
      <path
        d="M47.6259 8.95021C48.2908 8.6845 49.0021 8.5544 49.718 8.56756V11.3181C49.3851 11.2933 49.1639 11.2809 49.0496 11.2809C48.1949 11.2809 47.5265 11.5194 47.0444 11.9965C46.5475 12.4735 46.3164 13.1916 46.3164 14.1458V18.9984H43.3348V8.71664H46.1847V10.0733C46.5506 9.5715 47.0499 9.1824 47.6259 8.95021Z"
        fill="#00156A"
      />
      <path
        d="M59.25 9.69504C60.1014 10.4537 60.528 11.5967 60.5296 13.1239V18.9879H57.7393V17.7058C57.1811 18.6632 56.1375 19.1411 54.6086 19.1395C53.9028 19.156 53.2017 19.0195 52.5537 18.7394C52.0147 18.5042 51.5543 18.1197 51.2269 17.6312C50.9198 17.1529 50.7607 16.5945 50.7696 16.0261C50.7523 15.591 50.8415 15.1583 51.0294 14.7656C51.2173 14.3728 51.4984 14.0319 51.848 13.7725C52.5661 13.2258 53.6792 12.95 55.18 12.95H57.5505C57.5663 12.6732 57.5214 12.3963 57.4188 12.1388C57.3162 11.8812 57.1584 11.6492 56.9566 11.4592C56.5673 11.1113 55.9751 10.9374 55.18 10.9374C54.6327 10.9346 54.0885 11.0185 53.5674 11.1859C53.0805 11.3366 52.6245 11.573 52.2207 11.8841L51.1498 9.80188C51.7638 9.38258 52.4455 9.07241 53.1649 8.88501C53.9524 8.66804 54.7657 8.55855 55.5825 8.55952C57.1728 8.56117 58.3952 8.93968 59.25 9.69504ZM56.7081 16.7815C57.1033 16.545 57.4017 16.1761 57.5505 15.7404V14.6893H55.5055C54.2831 14.6893 53.6718 15.0902 53.6718 15.8919C53.6657 16.0685 53.7036 16.2439 53.7822 16.4022C53.8607 16.5605 53.9773 16.6968 54.1215 16.7989C54.4876 17.044 54.9242 17.1618 55.3639 17.1343C55.8352 17.1426 56.3 17.0224 56.7081 16.7864V16.7815Z"
        fill="#00156A"
      />
      <path
        d="M65.353 18.4655C64.5092 18.0417 63.8009 17.3901 63.3081 16.5846C62.8259 15.7544 62.5719 14.8115 62.5719 13.8514C62.5719 12.8913 62.8259 11.9484 63.3081 11.1182C63.8016 10.3133 64.5097 9.66188 65.353 9.23728C66.2665 8.77512 67.2788 8.54231 68.3024 8.55895C69.291 8.53575 70.2687 8.76948 71.14 9.23728C71.9283 9.66844 72.5501 10.3506 72.9066 11.1754L70.5958 12.4177C70.0591 11.4752 69.2888 11.0039 68.285 11.0039C67.928 10.9931 67.5726 11.0554 67.2406 11.187C66.9086 11.3186 66.607 11.5167 66.3544 11.7692C65.8632 12.3518 65.5937 13.0893 65.5937 13.8514C65.5937 14.6135 65.8632 15.351 66.3544 15.9336C66.6071 16.1857 66.9088 16.3835 67.2408 16.5147C67.5728 16.6459 67.9282 16.7077 68.285 16.6964C69.3037 16.6964 70.0715 16.2268 70.5958 15.2826L72.9066 16.5448C72.5403 17.3557 71.9202 18.0254 71.14 18.4531C70.2696 18.926 69.2901 19.1616 68.2999 19.1364C67.2778 19.155 66.2664 18.9247 65.353 18.4655Z"
        fill="#00156A"
      />
      <path
        d="M78.9628 14.9626L77.5291 16.374V18.9929H74.5474V4.82996H77.5291V12.8506L81.8848 8.726H85.4454L81.1667 13.0817L85.8256 19.0028H82.2153L78.9628 14.9626Z"
        fill="#00156A"
      />
      <path
        d="M96.7228 14.6924H88.9481C89.0708 15.3052 89.4273 15.8461 89.9419 16.2007C90.5166 16.5863 91.1984 16.7802 91.89 16.7548C92.375 16.7602 92.8568 16.676 93.3112 16.5063C93.7431 16.3391 94.1362 16.0854 94.4666 15.7609L96.0544 17.4803C95.0853 18.5885 93.6715 19.1426 91.8129 19.1426C90.7483 19.1638 89.6939 18.9313 88.7369 18.4643C87.8842 18.0466 87.1687 17.394 86.6745 16.5833C86.1837 15.7573 85.9325 14.8109 85.949 13.8501C85.934 12.8909 86.1814 11.9457 86.6646 11.1169C87.1333 10.317 87.8145 9.66249 88.6325 9.22606C89.4863 8.78491 90.4325 8.55243 91.3935 8.54768C92.3545 8.54293 93.3029 8.76605 94.161 9.19873C94.9666 9.6219 95.6333 10.268 96.0817 11.0598C96.5597 11.9207 96.8006 12.893 96.7799 13.8775C96.7799 13.9172 96.76 14.1955 96.7228 14.6924ZM89.7506 11.3878C89.2828 11.7846 88.9827 12.3439 88.9108 12.9531H93.9722C93.8942 12.3481 93.5939 11.7937 93.1298 11.3977C92.6597 11.005 92.0625 10.7974 91.4502 10.8138C90.833 10.7938 90.2293 10.9977 89.7506 11.3878Z"
        fill="#00156A"
      />
      <path
        d="M103.055 8.95021C103.72 8.6845 104.431 8.5544 105.147 8.56756V11.3181C104.814 11.2933 104.593 11.2809 104.478 11.2809C103.624 11.2809 102.954 11.5194 102.471 11.9965C101.974 12.4735 101.745 13.1916 101.745 14.1458V18.9984H98.7635V8.71664H101.609V10.0733C101.976 9.57105 102.477 9.18195 103.055 8.95021Z"
        fill="#00156A"
      />
    </svg>
  );
};

export const NotificationIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4276 16.5693H16.999V10.4978C16.999 7.97819 15.1365 5.89604 12.7133 5.54961V4.85497C12.7133 4.46033 12.3937 4.14069 11.999 4.14069C11.6044 4.14069 11.2847 4.46033 11.2847 4.85497V5.54961C8.86152 5.89604 6.99902 7.97819 6.99902 10.4978V16.5693H6.57045C6.25438 16.5693 5.99902 16.8246 5.99902 17.1407V17.7121C5.99902 17.7907 6.06331 17.855 6.14188 17.855H9.99902C9.99902 18.9585 10.8955 19.855 11.999 19.855C13.1026 19.855 13.999 18.9585 13.999 17.855H17.8562C17.9347 17.855 17.999 17.7907 17.999 17.7121V17.1407C17.999 16.8246 17.7437 16.5693 17.4276 16.5693ZM11.999 18.7121C11.5258 18.7121 11.1419 18.3282 11.1419 17.855H12.8562C12.8562 18.3282 12.4722 18.7121 11.999 18.7121ZM8.28474 16.5693V10.4978C8.28474 9.50497 8.67045 8.57283 9.37224 7.87104C10.074 7.16926 11.0062 6.78354 11.999 6.78354C12.9919 6.78354 13.924 7.16926 14.6258 7.87104C15.3276 8.57283 15.7133 9.50497 15.7133 10.4978V16.5693H8.28474Z" fill="black" fill-opacity="0.85"/>
    </svg>
  );
};

export const EmailIcon2 = (props: SVGAttributes<SVGElement>) => {
  const { width = 16, height = 12, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 16 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.3335 2.66663L6.77678 6.47692C7.21756 6.78547 7.43795 6.93974 7.67767 6.9995C7.88943 7.05228 8.1109 7.05228 8.32265 6.9995C8.56238 6.93974 8.78277 6.78547 9.22355 6.47692L14.6668 2.66663M4.5335 11.3333H11.4668C12.5869 11.3333 13.147 11.3333 13.5748 11.1153C13.9511 10.9236 14.2571 10.6176 14.4488 10.2413C14.6668 9.81345 14.6668 9.2534 14.6668 8.13329V3.86663C14.6668 2.74652 14.6668 2.18647 14.4488 1.75865C14.2571 1.38232 13.9511 1.07636 13.5748 0.884613C13.147 0.666626 12.5869 0.666626 11.4668 0.666626H4.5335C3.41339 0.666626 2.85334 0.666626 2.42552 0.884613C2.04919 1.07636 1.74323 1.38232 1.55148 1.75865C1.3335 2.18647 1.3335 2.74652 1.3335 3.86663V8.13329C1.3335 9.2534 1.3335 9.81345 1.55148 10.2413C1.74323 10.6176 2.04919 10.9236 2.42552 11.1153C2.85334 11.3333 3.41339 11.3333 4.5335 11.3333Z"
        stroke="#667085"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ThreeDotIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 24, height = 24, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5.5" r="1.5" fill="#65676D"/>
      <circle cx="12" cy="18.5" r="1.5" fill="#65676D"/>
      <circle cx="12" cy="12" r="1.5" fill="#65676D"/>
    </svg>
  );
};

export const CorrectSignIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 11, height = 11, fill = 'none' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 11 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5.5" cy="6" r="5.5" fill="#494C57"/>
      <path d="M2.75 5.7251L4.4 7.3751L6.05 5.8626L7.7 4.3501" stroke="white" stroke-width="0.825" stroke-linecap="round"/>
    </svg>
  );
};

export const MilestoneBarIcon = (props: SVGAttributes<SVGElement>) => {
  const { width = 16, height = 16, fill = 'none' } = props;
  return (
  <svg width={width} height={height} viewBox="0 0 16 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <rect x="0.400391" y="8" width="10.748" height="10.748" rx="1.2" transform="rotate(-45 0.400391 8)" fill="#3866FF"/>
    <path d="M5.7676 7.93631L6.87502 8.21151L6.23743 10.7888C6.08977 11.3928 6.38507 11.5942 6.89516 11.2385L10.3718 8.82897C10.7947 8.53366 10.7342 8.19135 10.2309 8.06383L9.12344 7.78867L9.76106 5.21136C9.90872 4.60731 9.6134 4.40597 9.10331 4.76169L5.62666 7.1712C5.20382 7.46652 5.26422 7.80878 5.7676 7.93631Z" fill="#FCFCFF"/>
  </svg>
  );
};
