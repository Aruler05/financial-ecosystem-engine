
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Plus } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DeleteButton, DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

// Initial mock data
const initialSummary = {
  dueThisWeek: 485.64,
  dueNextWeek: 340.25,
  totalMonthly: 1875.89,
  overdue: 0.00
};

const initialUpcomingBills = [
  { 
    id: 1,
    name: "Electricity Bill", 
    dueIn: "2 days", 
    amount: 85.40, 
    priority: "High Priority",
    priorityColor: "bg-finance-red/10 text-finance-red"
  },
  { 
    id: 2,
    name: "Internet", 
    dueIn: "5 days", 
    amount: 59.99, 
    priority: "Medium Priority",
    priorityColor: "bg-finance-orange/10 text-finance-orange"
  },
  { 
    id: 3,
    name: "Credit Card", 
    dueIn: "7 days", 
    amount: 340.25, 
    priority: "Medium Priority",
    priorityColor: "bg-finance-orange/10 text-finance-orange"
  },
  { 
    id: 4,
    name: "Water Bill", 
    dueIn: "12 days", 
    amount: 45.20, 
    priority: "Low Priority",
    priorityColor: "bg-finance-blue/10 text-finance-blue"
  }
];

const initialRecurringBills = [
  { id: 1, name: "Rent", schedule: "Monthly on 1st", amount: 1200.00 },
  { id: 2, name: "Internet", schedule: "Monthly on 5th", amount: 59.99 },
  { id: 3, name: "Electricity", schedule: "Monthly on 15th", amount: 85.40 },
  { id: 4, name: "Phone Plan", schedule: "Monthly on 18th", amount: 45.00 },
  { id: 5, name: "Streaming Services", schedule: "Monthly on 22nd", amount: 35.97 },
  { id: 6, name: "Gym Membership", schedule: "Monthly on 25th", amount: 29.99 }
];

// Priority options
const priorityOptions = [
  { value: "high", label: "High Priority", color: "bg-finance-red/10 text-finance-red" },
  { value: "medium", label: "Medium Priority", color: "bg-finance-orange/10 text-finance-orange" },
  { value: "low", label: "Low Priority", color: "bg-finance-blue/10 text-finance-blue" },
];

const BillTracker = () => {
  const [summary, setSummary] = useState(initialSummary);
  const [upcomingBills, setUpcomingBills] = useState(initialUpcomingBills);
  const [recurringBills, setRecurringBills] = useState(initialRecurringBills);
  const [showAddBill, setShowAddBill] = useState(false);
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: new Date().toISOString().split('T')[0],
    priority: "",
    recurring: "no",
    frequency: "monthly",
    dayOfMonth: "1"
  });
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
  const [selectedBillType, setSelectedBillType] = useState<'upcoming' | 'recurring' | null>(null);

  const handleAddBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Format the due date to calculate "due in X days"
    const dueDate = new Date(newBill.dueDate);
    const today = new Date();
    const diffTime = Math.abs(dueDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dueIn = `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    
    // Get the priority color based on selection
    const selectedPriority = priorityOptions.find(option => option.value === newBill.priority);
    
    if (newBill.recurring === "yes") {
      // Add to recurring bills
      const newRecurringBill = {
        id: recurringBills.length > 0 ? Math.max(...recurringBills.map(bill => bill.id)) + 1 : 1,
        name: newBill.name,
        schedule: `${newBill.frequency.charAt(0).toUpperCase() + newBill.frequency.slice(1)} on ${newBill.dayOfMonth}${
          newBill.dayOfMonth === '1' ? 'st' : 
          newBill.dayOfMonth === '2' ? 'nd' : 
          newBill.dayOfMonth === '3' ? 'rd' : 'th'
        }`,
        amount: parseFloat(newBill.amount)
      };
      setRecurringBills([...recurringBills, newRecurringBill]);
    } else {
      // Add to upcoming bills
      const newUpcomingBill = {
        id: upcomingBills.length > 0 ? Math.max(...upcomingBills.map(bill => bill.id)) + 1 : 1,
        name: newBill.name,
        dueIn,
        amount: parseFloat(newBill.amount),
        priority: selectedPriority ? selectedPriority.label : "Medium Priority",
        priorityColor: selectedPriority ? selectedPriority.color : "bg-finance-orange/10 text-finance-orange"
      };
      setUpcomingBills([...upcomingBills, newUpcomingBill]);
    }

    // Update the summary
    const newAmount = parseFloat(newBill.amount);
    setSummary({
      ...summary,
      totalMonthly: summary.totalMonthly + newAmount,
      dueThisWeek: diffDays <= 7 ? summary.dueThisWeek + newAmount : summary.dueThisWeek,
      dueNextWeek: diffDays > 7 && diffDays <= 14 ? summary.dueNextWeek + newAmount : summary.dueNextWeek
    });

    setShowAddBill(false);
    setNewBill({
      name: "",
      amount: "",
      dueDate: new Date().toISOString().split('T')[0],
      priority: "",
      recurring: "no",
      frequency: "monthly",
      dayOfMonth: "1"
    });
    
    toast({
      title: "Bill added",
      description: "Your new bill has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteClick = (id: number, type: 'upcoming' | 'recurring') => {
    setSelectedBillId(id);
    setSelectedBillType(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBillId === null || selectedBillType === null) return;
    
    if (selectedBillType === 'upcoming') {
      const billToDelete = upcomingBills.find(bill => bill.id === selectedBillId);
      
      if (billToDelete) {
        // Update summary
        setSummary({
          ...summary,
          totalMonthly: summary.totalMonthly - billToDelete.amount,
          dueThisWeek: billToDelete.dueIn.includes("day") && parseInt(billToDelete.dueIn) <= 7 
            ? summary.dueThisWeek - billToDelete.amount 
            : summary.dueThisWeek,
          dueNextWeek: billToDelete.dueIn.includes("day") && parseInt(billToDelete.dueIn) > 7 && parseInt(billToDelete.dueIn) <= 14
            ? summary.dueNextWeek - billToDelete.amount
            : summary.dueNextWeek
        });
      }
      
      setUpcomingBills(upcomingBills.filter(bill => bill.id !== selectedBillId));
    } else {
      const billToDelete = recurringBills.find(bill => bill.id === selectedBillId);
      
      if (billToDelete) {
        // Update summary
        setSummary({
          ...summary,
          totalMonthly: summary.totalMonthly - billToDelete.amount
        });
      }
      
      setRecurringBills(recurringBills.filter(bill => bill.id !== selectedBillId));
    }
    
    setSelectedBillId(null);
    setSelectedBillType(null);
    
    toast({
      title: "Bill deleted",
      description: "The bill has been successfully removed."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bill Reminders</h1>
          <p className="text-muted-foreground">Keep track of your upcoming bills and payments.</p>
        </div>
        <Dialog open={showAddBill} onOpenChange={setShowAddBill}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>
                Enter the details of your bill below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Bill Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter bill name"
                  value={newBill.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  value={newBill.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={newBill.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recurring">Is this a recurring bill?</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("recurring", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newBill.recurring === "yes" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("frequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dayOfMonth">Day of Month</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("dayOfMonth", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddBill(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBill}>Save Bill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Due this week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={summary.dueThisWeek} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-orange/10">
                <BellRing className="h-5 w-5 text-finance-orange" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {upcomingBills.filter(bill => 
                bill.dueIn.includes("day") && parseInt(bill.dueIn) <= 7
              ).length} upcoming bills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Due next week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={summary.dueNextWeek} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-blue/10">
                <BellRing className="h-5 w-5 text-finance-blue" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {upcomingBills.filter(bill => 
                bill.dueIn.includes("day") && parseInt(bill.dueIn) > 7 && parseInt(bill.dueIn) <= 14
              ).length} upcoming bills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={summary.totalMonthly} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-purple/10">
                <BellRing className="h-5 w-5 text-finance-purple" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{recurringBills.length} regular bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={summary.overdue} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-green/10">
                <BellRing className="h-5 w-5 text-finance-green" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">No overdue bills</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Bills due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBills.map((bill, index) => (
                <Card key={bill.id} className="border shadow-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{bill.name}</h3>
                        <p className="text-sm text-muted-foreground">Due in {bill.dueIn}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <p className="font-medium">
                            <CurrencyDisplay amount={bill.amount} />
                          </p>
                          <DeleteButton onClick={() => handleDeleteClick(bill.id, 'upcoming')} />
                        </div>
                        <div className={`rounded ${bill.priorityColor} px-2 py-1 text-xs font-medium`}>
                          {bill.priority}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Bills</CardTitle>
            <CardDescription>Monthly recurring payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recurringBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="font-medium">{bill.name}</h3>
                    <p className="text-sm text-muted-foreground">{bill.schedule}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">
                      <CurrencyDisplay amount={bill.amount} />
                    </p>
                    <DeleteButton onClick={() => handleDeleteClick(bill.id, 'recurring')} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Bill"
        description="Are you sure you want to delete this bill? This action cannot be undone."
      />
    </div>
  );
};

export default BillTracker;
