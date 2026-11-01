import { CampusDemo } from './CampusDemo'
import { ChurnDemo } from './ChurnDemo'
import { DataExplorerDemo } from './DataExplorerDemo'
import { HostelDemo } from './HostelDemo'

/** Picks the in-browser demo for a project slug (null when a project has none). */
export function ProjectDemo({ slug }: { slug: string }) {
  switch (slug) {
    case 'student-hostel-management-system':
      return <HostelDemo />
    case 'campusconnect':
      return <CampusDemo />
    case 'customer-churn-prediction-system':
      return <ChurnDemo />
    case 'sales-performance-analysis':
    case 'student-performance-analysis':
    case 'air-quality-trends-analysis':
      return <DataExplorerDemo slug={slug} />
    default:
      return null
  }
}
