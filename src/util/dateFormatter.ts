const formatDate = (dateToFormat: string): string => {
  const date = new Date(dateToFormat);
  return `${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })} - ${date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
};

export default formatDate;
