export type WorkLanguage = 'zh' | 'en'

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export type WorkItem = WorkListItem

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export type WorksCopy = WorksLang

export const WORKS: Record<WorkLanguage, WorksLang> = {
  "zh": {
    "title": "项目经历",
    "closeLabel": "返回",
    "openLabel": "展开作品",
    "hint": "继续下滑",
    "awardsLabel": "项目成果",
    "visitLabel": "查看完整项目",
    "detailPlaceholder": "项目详情",
    "phImageLabel": "项目预览",
    "phButtonLabel": "打开项目",
    "countLabel": (n: number) => `${n} 个项目`,
    "sections": [
      {
        "id": "project-1",
        "no": "01",
        "title": "AI运营分析与策略复盘",
        "tagline": "指标监测｜问题定位｜合作资源｜AI提效",
        "items": [
          {
            "name": "AI资讯产品运营与数据分析",
            "meta": "Operational Analysis & Strategy Review",
            "slug": "ai-news-dashboard",
            "link": `${import.meta.env.BASE_URL}projects/ai-news-dashboard/case_study.html`,
            "tags": [
              "监测诊断：AI看板定位流失，反馈与价格问卷辅助判断",
              "执行支持：合作资源筛选，100+条产品内容",
              "策略优化：A/B测试、渠道预算调整与投放复盘",
              "阶段结果：注册较前周+50%，首次专题创建率相对约+15%"
            ]
          }
        ]
      },
      {
        "id": "project-2",
        "no": "02",
        "title": "合作方运营与履约跟进",
        "tagline": "需求建档｜协议核验｜协同交付｜流程沉淀",
        "items": [
          {
            "name": "AI教育产品合作方运营与项目交付",
            "meta": "Partner Operations & Delivery Follow-up",
            "slug": "ai-education-partnership",
            "link": `${import.meta.env.BASE_URL}projects/ai-education-partnership/case_study.html`,
            "tags": [
              "合作建档：确认需求、试用安排与合作条件",
              "协议核验：条款、付款节点、版本及审批归档",
              "交付跟进：演示与试点、任务负责人及使用问题",
              "流程沉淀：周度进展复盘，AI辅助SOP与清单模板"
            ]
          }
        ]
      },
      {
        "id": "project-4",
        "no": "03",
        "title": "海外渠道协同与内容复盘",
        "tagline": "用户洞察｜门店信息｜执行协同｜周度复盘",
        "items": [
          {
            "name": "ZUS Coffee海外渠道协同与运营复盘",
            "meta": "Overseas Channel Coordination & Review",
            "slug": "zus-everywhere",
            "link": `${import.meta.env.BASE_URL}projects/zus-everywhere/case_study.html`,
            "tags": [
              "前期洞察：用户偏好、社媒互动与竞品内容",
              "渠道执行：线上首发与FamilyMart门店物料及排期",
              "内容支持：50条Instagram内容及英文文案",
              "持续复盘：15+次内容复盘，期间账号粉丝+1.1w+"
            ]
          }
        ]
      }
    ]
  },
  "en": {
  "title": "Project Experience",
  "closeLabel": "Back",
  "openLabel": "Open case",
  "hint": "Scroll to continue",
  "awardsLabel": "Outcomes",
  "visitLabel": "View full case",
  "detailPlaceholder": "Project details",
  "phImageLabel": "Project preview",
  "phButtonLabel": "Open project",
  "countLabel": (n: number) => `${n} projects`,
  "sections": [
    {
      "id": "project-1",
      "no": "01",
      "title": "AI Operations Analysis & Strategy Review",
      "tagline": "Metrics · Issue Diagnosis · Partner Resources · AI",
      "items": [
        {
          "name": "AI Information Product Operations & Analysis",
          "meta": "From Metrics to Testing and Review",
          "slug": "ai-news-dashboard",
          "link": `${import.meta.env.BASE_URL}projects/ai-news-dashboard/case_study.html`,
          "tags": [
            "Monitoring: AI dashboard and user-journey drop-offs",
            "Execution: creator screening and 100+ product posts",
            "Optimization: A/B tests and channel spending reviews",
            "Period results: registrations +50% versus prior week; first-topic rate approximately +15% relatively"
          ]
        }
      ]
    },
    {
      "id": "project-2",
      "no": "02",
      "title": "Partner Operations & Delivery Follow-up",
      "tagline": "Requirements · Agreement Checks · Delivery · SOPs",
      "items": [
        {
          "name": "AI Education Partner Operations & Project Delivery",
          "meta": "From Partner Requirements to Issue Resolution",
          "slug": "ai-education-partnership",
          "link": `${import.meta.env.BASE_URL}projects/ai-education-partnership/case_study.html`,
          "tags": [
            "Partner register: needs, trials and cooperation terms",
            "Agreement checks: scope, payment milestones and approvals",
            "Delivery: demos, pilots, task owners and product issues",
            "Process review: weekly progress and AI-assisted SOPs"
          ]
        }
      ]
    },
    {
      "id": "project-4",
      "no": "03",
      "title": "Overseas Channel Coordination & Review",
      "tagline": "User Insights · Store Information · Execution · Reviews",
      "items": [
        {
          "name": "ZUS Coffee Channel Coordination & Content Review",
          "meta": "Insights, Channel Execution and Weekly Learning",
          "slug": "zus-everywhere",
          "link": `${import.meta.env.BASE_URL}projects/zus-everywhere/case_study.html`,
          "tags": [
            "Insights: preferences, social feedback and competitor content",
            "Channels: online launch and FamilyMart assets and schedules",
            "Content support: 50 Instagram posts and English copy",
            "Reviews: 15+ content reviews; 11k+ account follower growth during the period"
          ]
        }
      ]
    }
  ]
}
}


export const WORKS_CONTENT = WORKS

export const SECTION_COVERS: Record<string, string> = {
  'project-1': `${import.meta.env.BASE_URL}works/covers/sohu-dashboard.png`,
  'project-2': `${import.meta.env.BASE_URL}works/covers/education-pilot.png`,
  'project-4': `${import.meta.env.BASE_URL}works/covers/zus-everywhere.jpg`,
}
