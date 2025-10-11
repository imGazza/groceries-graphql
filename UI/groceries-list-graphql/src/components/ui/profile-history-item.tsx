import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Package, ChevronRight, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import type { GroceryList } from "@/http/grocery-list"

interface ProfileHistoryItemProps {
  list: GroceryList,
  onClick?: () => void;
}

const ProfileHistoryItem = ({ list, onClick }: ProfileHistoryItemProps) => {
  const itemCount = list.items.length

  return (
    <Card
      className="group relative overflow-hidden border-border bg-card hover:border-custom/50 transition-all duration-300 cursor-pointer text-left"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-lg bg-custom/10 text-custom"
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">
                Completed
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(list.completedAt, "MMM dd, yyyy")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="p-2 rounded-md bg-background">
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Items</p>
              <p className="text-lg font-semibold text-card-foreground">{itemCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="p-2 rounded-md bg-background">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-card-foreground">${list.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Items Preview</p>
          <div className="flex flex-wrap gap-2">
            {list.items.slice(0, 4).map((item) => (
              <div
                key={item.productItemId}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-sm"
              >
                <span className="font-medium">{item.productItemName}</span>
                <span className="text-muted-foreground">×{item.quantity}</span>
              </div>
            ))}
            {itemCount > 4 && (
              <div className="flex items-center px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-sm font-medium">
                +{itemCount - 4} more
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-between group-hover:bg-custom/10 hover:bg-custom/10 hover:text-custom group-hover:text-custom transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-custom/50 via-custom to-custom/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  )
}
export default ProfileHistoryItem;
