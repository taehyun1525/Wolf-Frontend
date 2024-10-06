const UsersData = [
    {
        user_id: 1,
        nickname: '늑대',
        name: '김철수',
        email: 'kimcs@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '백엔드 개발자',
        organization: '회사A',
        experience: 5,
        interests: '개발, 독서',
        refund_account: '123-456-789',
        introduction: '안녕하세요, 김철수입니다.',
        created_date: new Date('2024-01-01T10:00:00'),
        status: 'A'
    },
    {
        user_id: 2,
        nickname: '사슴',
        name: '이영희',
        email: 'leeyh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '프론트엔드 개발자',
        organization: '회사B',
        experience: 3,
        interests: '코딩, 여행',
        refund_account: '987-654-321',
        introduction: '프론트엔드 개발자 이영희입니다.',
        created_date: new Date('2024-01-02T11:30:00'),
        status: 'A'
    },
    {
        user_id: 3,
        nickname: '여우',
        name: '박지훈',
        email: 'parkjh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '데이터 엔지니어',
        organization: '회사C',
        experience: 8,
        interests: '데이터 분석, AI',
        refund_account: '321-654-987',
        introduction: '데이터 관련 업무를 하고 있습니다.',
        created_date: new Date('2024-01-03T12:45:00'),
        status: 'A'
    },
    {
        user_id: 4,
        nickname: '토끼',
        name: '최유리',
        email: 'choiyr@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '디자이너',
        organization: '회사D',
        experience: 2,
        interests: '여행, 디자인',
        refund_account: '654-321-987',
        introduction: '디자인을 사랑하는 최유리입니다.',
        created_date: new Date('2024-01-04T14:20:00'),
        status: 'S'
    },
    {
        user_id: 5,
        nickname: '곰',
        name: '윤성호',
        email: 'yunsh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '풀스택 개발자',
        organization: '회사E',
        experience: 10,
        interests: '개발, 게임',
        refund_account: '159-753-852',
        introduction: '다양한 분야의 개발 경험이 있습니다.',
        created_date: new Date('2024-01-05T09:15:00'),
        status: 'A'
    },
    {
        user_id: 6,
        nickname: '올빼미',
        name: '장민정',
        email: 'jangmj@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: 'UX/UI 디자이너',
        organization: '회사F',
        experience: 4,
        interests: '디자인, 미술',
        refund_account: '951-357-258',
        introduction: '디자인에 관심이 많습니다.',
        created_date: new Date('2024-01-06T08:05:00'),
        status: 'A'
    },
    {
        user_id: 7,
        nickname: 'techguru',
        name: '정민수',
        email: 'jungms@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '기술 리더',
        organization: '회사G',
        experience: 12,
        interests: '기술, 경영',
        refund_account: '753-951-456',
        introduction: '기술과 경영의 경계에서 일하고 있습니다.',
        created_date: new Date('2024-01-07T16:30:00'),
        status: 'A'
    },
    {
        user_id: 8,
        nickname: 'codewizard',
        name: '박서준',
        email: 'parksej@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '백엔드 개발자',
        organization: '회사H',
        experience: 7,
        interests: '코딩, 음악',
        refund_account: '456-789-123',
        introduction: '백엔드 개발자 박서준입니다.',
        created_date: new Date('2024-01-08T17:45:00'),
        status: 'S'
    },
    {
        user_id: 9,
        nickname: 'datascientist',
        name: '한수정',
        email: 'hansj@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '데이터 과학자',
        organization: '회사I',
        experience: 6,
        interests: '데이터 분석, 통계',
        refund_account: '852-963-741',
        introduction: '데이터 분석 전문가입니다.',
        created_date: new Date('2024-01-09T18:10:00'),
        status: 'A'
    },
    {
        user_id: 10,
        nickname: 'creativeguy',
        name: '홍길동',
        email: 'honggd@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '마케팅 매니저',
        organization: '회사J',
        experience: 5,
        interests: '마케팅, 창작',
        refund_account: '123-456-123',
        introduction: '창의적인 마케팅을 추구합니다.',
        created_date: new Date('2024-01-10T19:25:00'),
        status: 'P'
    },
    {
        user_id: 11,
        nickname: 'analystpro',
        name: '고은영',
        email: 'koey@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '비즈니스 분석가',
        organization: '회사K',
        experience: 9,
        interests: '분석, 데이터',
        refund_account: '369-852-147',
        introduction: '비즈니스 분석 전문가입니다.',
        created_date: new Date('2024-01-11T15:30:00'),
        status: 'A'
    },
    {
        user_id: 12,
        nickname: 'devloper123',
        name: '김민호',
        email: 'kimminh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '안드로이드 개발자',
        organization: '회사L',
        experience: 6,
        interests: '모바일 앱 개발',
        refund_account: '741-852-963',
        introduction: '안드로이드 개발에 관심이 많습니다.',
        created_date: new Date('2024-01-12T14:15:00'),
        status: 'A'
    },
    {
        user_id: 13,
        nickname: 'marketinggenius',
        name: '이상훈',
        email: 'leesh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '디지털 마케터',
        organization: '회사M',
        experience: 4,
        interests: '디지털 마케팅, SEO',
        refund_account: '123-789-456',
        introduction: '마케팅 전략가입니다.',
        created_date: new Date('2024-01-13T11:00:00'),
        status: 'A'
    },
    {
        user_id: 14,
        nickname: 'cloudexpert',
        name: '최지현',
        email: 'choijh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '클라우드 엔지니어',
        organization: '회사N',
        experience: 7,
        interests: '클라우드 컴퓨팅, DevOps',
        refund_account: '852-123-456',
        introduction: '클라우드 전문가입니다.',
        created_date: new Date('2024-01-14T10:00:00'),
        status: 'S'
    },
    {
        user_id: 15,
        nickname: 'secpro',
        name: '안성진',
        email: 'ansj@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '보안 엔지니어',
        organization: '회사O',
        experience: 10,
        interests: '보안, 해킹 방지',
        refund_account: '963-852-741',
        introduction: '보안에 대한 전문 지식이 있습니다.',
        created_date: new Date('2024-01-15T09:30:00'),
        status: 'A'
    },
    {
        user_id: 16,
        nickname: 'innovationmaster',
        name: '오하늘',
        email: 'ohhn@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '혁신 관리자',
        organization: '회사P',
        experience: 8,
        interests: '혁신, 프로젝트 관리',
        refund_account: '159-753-951',
        introduction: '혁신적인 프로젝트를 관리합니다.',
        created_date: new Date('2024-01-16T08:00:00'),
        status: 'A'
    },
    {
        user_id: 17,
        nickname: 'autobots',
        name: '임도형',
        email: 'limdh@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '자동차 엔지니어',
        organization: '회사Q',
        experience: 9,
        interests: '자동차, 기술',
        refund_account: '357-951-258',
        introduction: '자동차 기술에 관심이 많습니다.',
        created_date: new Date('2024-01-17T17:30:00'),
        status: 'A'
    },
    {
        user_id: 18,
        nickname: 'roboticsfan',
        name: '조하나',
        email: 'joha@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '로봇 엔지니어',
        organization: '회사R',
        experience: 5,
        interests: '로봇, 인공지능',
        refund_account: '147-258-369',
        introduction: '로봇 기술에 열정이 있습니다.',
        created_date: new Date('2024-01-18T09:45:00'),
        status: 'A'
    },
    {
        user_id: 19,
        nickname: 'ecoexpert',
        name: '송지윤',
        email: 'songjy@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '환경 전문가',
        organization: '회사S',
        experience: 6,
        interests: '환경, 지속 가능성',
        refund_account: '789-123-456',
        introduction: '환경 보호에 관심이 많습니다.',
        created_date: new Date('2024-01-19T14:30:00'),
        status: 'A'
    },
    {
        user_id: 20,
        nickname: 'nutritionist',
        name: '김서연',
        email: 'kimsy@example.com',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        job_title: '영양사',
        organization: '회사T',
        experience: 4,
        interests: '영양, 건강',
        refund_account: '258-369-741',
        introduction: '건강한 식생활을 권장합니다.',
        created_date: new Date('2024-01-20T16:00:00'),
        status: 'A'
    },
];
