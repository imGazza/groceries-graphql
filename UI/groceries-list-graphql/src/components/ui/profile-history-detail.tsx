import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Calendar, Package, DollarSign } from "lucide-react"
import { format } from "date-fns"
import type { GroceryList } from "@/http/grocery-list"
import { createImageUrl } from "@/lib/utils"

interface ProfileHistoryDetailProps {
  list: GroceryList | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ProfileHistoryDetail = ({ list, open, onOpenChange }: ProfileHistoryDetailProps) => {	

  if (!list) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">Grocery List Details</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(list.completedAt, "MMMM dd, yyyy")}</span>
              </div>
            </div>            
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <div className="p-2.5 rounded-md bg-background">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Items</p>
              <p className="text-2xl font-bold text-card-foreground">{list.items.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <div className="p-2.5 rounded-md bg-background">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Price</p>
              <p className="text-2xl font-bold text-card-foreground">${list.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Items</h3>
          <div className="space-y-3">
            {list.items.map((item) => {
              const subtotal = item.quantity * item.unitPrice
              return (
                <div
                  key={item.productItemId}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-9 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img src={createImageUrl(item.image)} alt={item.productItemName} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-card-foreground truncate">{item.productItemName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg text-card-foreground">${subtotal.toFixed(2)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>    
      </DialogContent>
    </Dialog>
  )
}
export default ProfileHistoryDetail;