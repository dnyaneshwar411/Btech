import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export default function Paginate({
  next = () => { },
  previous = () => { },
  current = 1,
  max = 4,
  className
}) {
  return <Pagination className={className}>
    <PaginationContent>
      {current > 1 && <PaginationItem>
        <PaginationPrevious onClick={previous} />
      </PaginationItem>}
      <PaginationItem>
        <PaginationLink>
          {current}
        </PaginationLink>
      </PaginationItem>
      {current < max && <PaginationItem>
        <PaginationNext onClick={next} />
      </PaginationItem>}
    </PaginationContent>
  </Pagination>

}