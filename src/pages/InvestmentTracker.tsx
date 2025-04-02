import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton, DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

const investmentTypes = [
  "Stocks",
  "Bonds",
  "ETFs",
  "Mutual Funds",
  "Crypto",
  "Real Estate",
  "Commodities",
  "Other"
];

const mockInvestments = [
  {
    id: 1,
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "Stocks",
    value: 18450.00,
    quantity: 105,
    purchasePrice: 156.32,
    purchaseDate: "2022-04-15",
    sector: "Technology",
    change: 12.4
  },
  {
    id: 2,
    name: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    type: "ETFs",
    value: 15320.00,
    quantity: 38,
    purchasePrice: 360.45,
    purchaseDate: "2021-10-08",
    sector: "Index Fund",
    change: 9.2
  },
  {
    id: 3,
    name: "Bitcoin",
    symbol: "BTC",
    type: "Crypto",
    value: 12800.00,
    quantity: 0.25,
    purchasePrice: 44250.00,
    purchaseDate: "2023-02-22",
    sector: "Cryptocurrency",
    change: 15.7
  },
  {
    id: 4,
    name: "Microsoft Corp.",
    symbol: "MSFT",
    type: "Stocks",
    value: 11250.00,
    quantity: 32,
    purchasePrice: 325.00,
    purchaseDate: "2022-07-30",
    sector: "Technology",
    change: 8.3
  },
  {
    id: 5,
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    type: "Stocks",
    value: 9850.00,
    quantity: 85,
    purchasePrice: 118.45,
    purchaseDate: "2022-05-12",
    sector: "Consumer Cyclical",
    change: -2.1
  }
];

const InvestmentTracker = () => {
  const [investments, setInvestments] = useState(mockInvestments);
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    symbol: "",
    type: "",
    value: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: new Date().toISOString().split('T')[0],
    sector: "",
    change: ""
  });
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.symbol || !newInvestment.type || !newInvestment.quantity) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const investmentToAdd = {
      ...newInvestment,
      id: investments.length + 1,
      value: parseFloat(newInvestment.value) || 0,
      quantity: parseFloat(newInvestment.quantity) || 0,
      purchasePrice: parseFloat(newInvestment.purchasePrice) || 0,
      change: parseFloat(newInvestment.change) || 0
    };

    setInvestments([investmentToAdd, ...investments]);
    setShowAddInvestment(false);
    setNewInvestment({
      name: "",
      symbol: "",
      type: "",
      value: "",
      quantity: "",
      purchasePrice: "",
      purchaseDate: new Date().toISOString().split('T')[0],
      sector: "",
      change: ""
    });

    toast({
      title: "Investment added",
      description: "Your investment has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvestment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewInvestment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteClick = (id: number) => {
    setSelectedInvestmentId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedInvestmentId === null) return;
    
    setInvestments(investments.filter(investment => investment.id !== selectedInvestmentId));
    setSelectedInvestmentId(null);
    
    toast({
      title: "Investment deleted",
      description: "The investment has been removed from your portfolio."
    });
  };

  const portfolioValue = investments.reduce((sum, investment) => sum + investment.value, 0);
  
  const stocksValue = investments.filter(inv => inv.type === "Stocks").reduce((sum, inv) => sum + inv.value, 0);
  const bondsValue = investments.filter(inv => ["Bonds", "ETFs"].includes(inv.type)).reduce((sum, inv) => sum + inv.value, 0);
  const cryptoValue = investments.filter(inv => inv.type === "Crypto").reduce((sum, inv) => sum + inv.value, 0);
  
  const stocksPercent = Math.round((stocksValue / portfolioValue) * 100) || 0;
  const bondsPercent = Math.round((bondsValue / portfolioValue) * 100) || 0;
  const cryptoPercent = Math.round((cryptoValue / portfolioValue) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">Track and analyze your investments.</p>
        </div>
        <Dialog open={showAddInvestment} onOpenChange={setShowAddInvestment}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Investment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Investment</DialogTitle>
              <DialogDescription>
                Enter the details of your investment below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Investment Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={newInvestment.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol/Ticker</Label>
                  <Input
                    id="symbol"
                    name="symbol"
                    placeholder="e.g., AAPL"
                    value={newInvestment.symbol}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Investment Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector/Category</Label>
                  <Input
                    id="sector"
                    name="sector"
                    placeholder="e.g., Technology"
                    value={newInvestment.sector}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity/Shares</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="0"
                    value={newInvestment.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    name="purchasePrice"
                    type="number"
                    placeholder="0.00"
                    value={newInvestment.purchasePrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    value={newInvestment.purchaseDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Current Value</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    placeholder="0.00"
                    value={newInvestment.value}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="change">Change (%)</Label>
                <Input
                  id="change"
                  name="change"
                  type="number"
                  placeholder="0.0"
                  value={newInvestment.change}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddInvestment(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInvestment}>Save Investment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={portfolioValue} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-indigo/10">
                <TrendingUp className="h-5 w-5 text-finance-indigo" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+<CurrencyDisplay amount={12450.00} /> (9.4%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={stocksValue} />
              </div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                {stocksPercent}% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+<CurrencyDisplay amount={8200.00} /> (10.6%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Bonds & Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={bondsValue} />
              </div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                {bondsPercent}% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+<CurrencyDisplay amount={2850.00} /> (7.2%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Crypto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={cryptoValue} />
              </div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                {cryptoPercent}% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+<CurrencyDisplay amount={1400.00} /> (8.8%) this year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Holdings</CardTitle>
          <CardDescription>Your investments by market value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Purchase Price</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium">{investment.name}</TableCell>
                    <TableCell>{investment.symbol}</TableCell>
                    <TableCell>{investment.type}</TableCell>
                    <TableCell>
                      <CurrencyDisplay amount={investment.value} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{investment.quantity}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <CurrencyDisplay amount={investment.purchasePrice} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(investment.purchaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={investment.change >= 0 ? "text-finance-green" : "text-finance-red"}>
                      {investment.change >= 0 ? "+" : ""}{investment.change}%
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClick={() => handleDeleteClick(investment.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Investment"
        description="Are you sure you want to delete this investment? This action cannot be undone."
      />
    </div>
  );
};

export default InvestmentTracker;
